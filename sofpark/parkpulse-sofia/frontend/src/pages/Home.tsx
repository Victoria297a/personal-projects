import React from 'react';
import MapView from '../components/MapView';
import ParkingList from '../components/ParkingList';
import EventList from '../components/EventList';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">Welcome to ParkPulse Sofia</h1>
            <MapView />
            <div className="mt-4 w-full max-w-4xl">
                <ParkingList />
                <EventList />
            </div>
        </div>
    );
};

export default Home;