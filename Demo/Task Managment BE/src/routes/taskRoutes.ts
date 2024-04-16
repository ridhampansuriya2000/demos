import express, { Router } from 'express';
import {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
} from '../controllers/taskController';

const router: Router = express.Router();

router.post('/task', createTask);
router.put('/task/:_id', updateTask);
router.delete('/task/:_id', deleteTask);
router.get('/tasks', getAllTasks);

export default router;
