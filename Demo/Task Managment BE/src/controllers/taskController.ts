import { Request, Response } from 'express';
import Task, { ITask } from '../models/Task';
import TaskStatus, { ITaskStatus } from '../models/TaskStatus';
import { getTaskStatusQuery } from './taskStatusController';

const getTaskStatuses = async () => {
    return await TaskStatus.aggregate(getTaskStatusQuery);
};

const getTasks = async () => {
    let res = await Task.aggregate(getTasksQuery);
    return res[0]
};

const handleTaskOperation = async (
    req: Request,
    res: Response,
    operation: () => Promise<any>,
) => {
    try {
        const result = await operation();

        let resData: any = { updatedData: result };

        if (req.query.getTaskStatuses === 'true') {
            const taskStatuses = await getTaskStatuses();
            resData = { ...resData, taskStatuses : taskStatuses[0] };
        }

        if (req.query.getTasks === 'true') {
            const tasks = await getTasks();
            resData = { ...resData, tasks };
        }

        res.status(200).json(resData);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createTask = async (req: Request, res: Response) => {
    await handleTaskOperation(req, res, async () => {
        const { title, description } = req.body;
        const getRendomPriority = () => {
            let rendom = Math.random();
            return (rendom < 0.33) ? 'Low' : (rendom < 0.66 && rendom >= 0.33) ? 'Mid' : 'High';
        };
        return await Task.create({
            title,
            description,
            priority: getRendomPriority(),
            taskStatus: '6554f72884ac799a1033184b'
        });
    });
};

export const updateTask = async (req: Request, res: Response) => {
    console.log("request",req.body)
    const _id = req.params._id;
    await handleTaskOperation(req, res, async () => {
        // const { title, description, taskStatus } = req.body;
        return await Task.findByIdAndUpdate(_id, { ...req.body },{new : true});
    });
};

export const deleteTask = async (req: Request, res: Response) => {
    const _id = req.params._id;
    await handleTaskOperation(req, res, async () => {
        await Task.findByIdAndDelete(_id);
        return {};
    });
};

export const getAllTasks = async (_req: Request, res: Response) => {
    await handleTaskOperation(_req, res, async () => {
        return await getTasks();
    });
};

export const getTasksQuery = [
    {
        $group: {
            _id: null,
            documents: { $push: '$$ROOT' }
        }
    },
    {
        $replaceRoot: {
            newRoot: {
                $arrayToObject: {
                    $map: {
                        input: '$documents',
                        as: 'document',
                        in: {
                            k: { $toString: '$$document._id' },
                            v: '$$document'
                        }
                    }
                }
            }
        }
    }
]
