// This file defines TypeScript types and interfaces used throughout the frontend application.

export interface ParkingZone {
    id: string;
    name: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    availability: number; // A score from 0 to 100 representing availability
}

export interface Event {
    id: string;
    title: string;
    date: string; // ISO date string
    description: string;
    location: {
        latitude: number;
        longitude: number;
    };
}

export interface ParkingData {
    zones: ParkingZone[];
}

export interface EventData {
    events: Event[];
}