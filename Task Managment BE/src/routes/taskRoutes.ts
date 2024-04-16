import express from 'express';
import {
    createTask,
    updateTask,
    deleteTask,
    getAllTasks,
} from '../controllers/taskController';

const router = express.Router();

router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
router.get('/tasks', getAllTasks);

export default router;
