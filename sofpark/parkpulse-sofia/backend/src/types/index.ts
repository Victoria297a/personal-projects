export interface ParkingZone {
    id: string;
    name: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    availabilityScore: number;
}

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: {
        latitude: number;
        longitude: number;
    };
}