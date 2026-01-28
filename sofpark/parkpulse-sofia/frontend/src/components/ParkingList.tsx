import React from 'react';
import { Parking } from '../types';

interface ParkingListProps {
  parkingData: Parking[];
}

const ParkingList: React.FC<ParkingListProps> = ({ parkingData }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Parking Options</h2>
      <ul className="space-y-4">
        {parkingData.map((parking) => (
          <li key={parking.id} className="border p-4 rounded shadow">
            <h3 className="font-semibold">{parking.name}</h3>
            <p>Location: {parking.location}</p>
            <p>Availability: {parking.availability ? 'Available' : 'Not Available'}</p>
            <p>Predicted Availability: {parking.predictedAvailability}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParkingList;