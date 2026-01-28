import React, { useEffect, useState } from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
      <ul className="space-y-2">
        {events.map(event => (
          <li key={event.id} className="border p-4 rounded shadow">
            <h3 className="font-semibold">{event.title}</h3>
            <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;