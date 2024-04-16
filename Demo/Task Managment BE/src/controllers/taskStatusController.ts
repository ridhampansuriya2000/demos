import { Request, Response } from 'express';
import TaskStatus, { ITaskStatus } from '../models/TaskStatus';

export const createTaskSatuts = async (req: Request, res: Response) => {
    try {
        const { title, taskList } = req.body;
        const savedTaskStatus = await TaskStatus.create({title, taskList});
        res.status(201).send({
            message : "task created successfully",
            data : savedTaskStatus
        })
    } catch (error : any ) {
        res.status(500).json({ error: error.message });
    }
};

export const updateTaskSatuts = async (req: Request, res: Response) => {
    try {
        const _id = req.params._id;
        const { title, taskList } = req.body;
        const updatedTaskStatus = await TaskStatus.findByIdAndUpdate(_id,{ title, taskList }, { new: true });
        res.status(200).json({data : updatedTaskStatus, message : 'task updated successfully'});
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteTaskSatuts = async (req: Request, res: Response) => {
    try {
        const _id = req.params._id;
        await TaskStatus.findByIdAndDelete(_id);
        res.status(200).json({ message: 'TaskStatus deleted successfully' });
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllTaskSatutses = async (_req: Request, res: Response) => {
    try {
        const taskStatuses = await TaskStatus.aggregate(getTaskStatusQuery);

        res.status(200).json({data : taskStatuses[0], message : 'Success'});
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
};

export const  getTaskStatusQuery =[
    {
        $lookup: {
            from: 'tasks', // Replace with the actual name of your tasks collection
            localField: '_id',
            foreignField: 'taskStatus',
            as: 'tasks',
        },
    },
    {
        $addFields: {
            taskList: { $map: { input: '$tasks', as: 'task', in: '$$task._id' } },
        },
    },
    {
        $project: { tasks: 0 },
    },
    {
        $group: { _id: null, documents: { $push: '$$ROOT' } },
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
                            v: '$$document',
                        },
                    },
                },
            },
        },
    }
]
