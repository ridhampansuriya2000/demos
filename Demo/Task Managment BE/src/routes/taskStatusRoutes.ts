import express, { Router } from 'express';
import {
  createTaskSatuts,
  updateTaskSatuts,
  deleteTaskSatuts,
  getAllTaskSatutses,
} from '../controllers/taskStatusController';

const router: Router = express.Router();

router.post('/taskStatus', createTaskSatuts);
router.put('/taskStatus/:_id', updateTaskSatuts);
router.delete('/taskStatus/:_id', deleteTaskSatuts);
router.get('/taskStatus', getAllTaskSatutses);

export default router;
