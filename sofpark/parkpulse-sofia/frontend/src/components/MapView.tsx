import React, { useEffect, useState } from 'react';
import { ParkingZone } from '../types';

const MapView: React.FC = () => {
    const [parkingZones, setParkingZones] = useState<ParkingZone[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchParkingZones = async () => {
            try {
                const response = await fetch('/api/parking-zones');
                const data = await response.json();
                setParkingZones(data);
            } catch (error) {
                console.error('Error fetching parking zones:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchParkingZones();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="map-container">
            <h2 className="text-center text-xl font-bold">Parking Availability in Sofia</h2>
            <div className="map">
                {/* Here you would integrate a map library like Leaflet or Google Maps */}
                {parkingZones.map(zone => (
                    <div
                        key={zone.id}
                        className={`parking-zone ${zone.available ? 'available' : 'full'}`}
                        style={{
                            position: 'absolute',
                            left: zone.coordinates.x,
                            top: zone.coordinates.y,
                        }}
                    >
                        {zone.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MapView;