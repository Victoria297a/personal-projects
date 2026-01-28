import { Router } from 'express';
import { getParkingZones } from '../controllers/parkingController';

const router = Router();

// Route to get parking zones
router.get('/api/parking-zones', getParkingZones);

export default router;