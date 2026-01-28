import React from 'react';

const About: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">About ParkPulse Sofia</h1>
            <p className="mb-4">
                ParkPulse Sofia is a web application designed to help users find available parking spots in Sofia, Bulgaria. 
                Our goal is to provide real-time information about parking availability and upcoming events that may affect parking demand.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Features</h2>
            <ul className="list-disc list-inside mb-4">
                <li>Interactive map displaying parking zones and their availability.</li>
                <li>Search functionality to find parking options based on user preferences.</li>
                <li>Upcoming events that may impact parking availability.</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-2">Get Involved</h2>
            <p>
                We welcome contributions and feedback! If you have suggestions or would like to help improve ParkPulse Sofia, 
                please reach out to us through our GitHub repository.
            </p>
        </div>
    );
};

export default About;