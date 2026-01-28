import { Request, Response } from 'express';
import parkingData from '../data/mock/parking.json';

export const getParkingZones = (req: Request, res: Response) => {
    res.json(parkingData);
};

export const getParkingZoneById = (req: Request, res: Response) => {
    const { id } = req.params;
    const parkingZone = parkingData.find(zone => zone.id === id);

    if (parkingZone) {
        res.json(parkingZone);
    } else {
        res.status(404).json({ message: 'Parking zone not found' });
    }
};