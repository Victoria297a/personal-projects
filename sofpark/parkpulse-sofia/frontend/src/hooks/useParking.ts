import { useEffect, useState } from 'react';

interface ParkingZone {
  id: number;
  name: string;
  availability: number; // 0 to 100
  coordinates: {
    lat: number;
    lng: number;
  };
}

const useParking = () => {
  const [parkingZones, setParkingZones] = useState<ParkingZone[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParkingData = async () => {
      try {
        const response = await fetch('/api/parking-zones');
        if (!response.ok) {
          throw new Error('Failed to fetch parking data');
        }
        const data = await response.json();
        setParkingZones(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParkingData();
  }, []);

  return { parkingZones, loading, error };
};

export default useParking;