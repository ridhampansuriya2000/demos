import { Request, Response } from 'express';
import Task, { ITask } from '../models/Task';

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const task: ITask = new Task({ title, description });
        const savedTask = await task.save();
        res.json(savedTask);
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const { title, description } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description }, { new: true });
        res.json(updatedTask);
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        await Task.findByIdAndDelete(taskId);
        res.json({ message: 'Task deleted successfully' });
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllTasks = async (_req: Request, res: Response) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
};
