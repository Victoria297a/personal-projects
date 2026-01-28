import { Router } from 'express';
import { getEvents } from '../controllers/eventsController';

const router = Router();

// Route to get all events
router.get('/', getEvents);

export default router;