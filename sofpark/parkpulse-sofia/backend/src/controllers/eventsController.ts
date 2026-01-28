import { Request, Response } from 'express';
import eventsData from '../data/mock/events.json';

export const getEvents = (req: Request, res: Response) => {
    res.json(eventsData);
};