# ParkPulse Sofia

ParkPulse Sofia is a web application designed to provide real-time parking availability and event information in Sofia. This project utilizes React with TypeScript for the frontend and Node.js with Express for the backend.

## Project Structure

```
parkpulse-sofia
├── frontend          # Frontend application
│   ├── package.json  # Frontend dependencies and scripts
│   ├── tsconfig.json # TypeScript configuration for frontend
│   ├── vite.config.ts # Vite configuration for frontend
│   ├── postcss.config.cjs # PostCSS configuration for TailwindCSS
│   ├── tailwind.config.cjs # TailwindCSS configuration
│   ├── public        # Public assets
│   │   └── index.html # Main HTML file
│   └── src          # Source files for frontend
│       ├── main.tsx # Entry point for React application
│       ├── App.tsx  # Main App component
│       ├── index.css # Global styles
│       ├── components # Reusable components
│       │   ├── MapView.tsx # Map view component
│       │   ├── ParkingList.tsx # Parking list component
│       │   └── EventList.tsx # Event list component
│       ├── pages     # Page components
│       │   ├── Home.tsx # Home page
│       │   └── About.tsx # About page
│       ├── hooks     # Custom hooks
│       │   └── useParking.ts # Hook for parking data
│       └── types     # Type definitions
│           └── index.ts # TypeScript types
├── backend           # Backend application
│   ├── package.json  # Backend dependencies and scripts
│   ├── tsconfig.json # TypeScript configuration for backend
│   ├── src          # Source files for backend
│   │   ├── index.ts  # Entry point for backend application
│   │   ├── app.ts    # Express app setup
│   │   ├── routes    # API routes
│   │   │   ├── parking.ts # Parking routes
│   │   │   └── events.ts # Event routes
│   │   ├── controllers # Request handlers
│   │   │   ├── parkingController.ts # Parking logic
│   │   │   └── eventsController.ts # Event logic
│   │   ├── data      # Mock data
│   │   │   └── mock
│   │   │       ├── parking.json # Mock parking data
│   │   │       └── events.json # Mock events data
│   │   └── types     # Type definitions
│   │       └── index.ts # TypeScript types
│   └── Dockerfile    # Docker configuration for backend
├── vercel.json       # Vercel deployment configuration
├── render.yaml       # Render deployment configuration
├── package.json      # Root package.json for overall project
├── .gitignore        # Git ignore file
└── README.md         # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd parkpulse-sofia
   ```

2. Install dependencies for the frontend:

   ```
   cd frontend
   npm install
   ```

3. Install dependencies for the backend:

   ```
   cd ../backend
   npm install
   ```

### Running the Application

1. Start the backend server:

   ```
   cd backend
   npm run start
   ```

2. In a new terminal, start the frontend application:

   ```
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

### Deployment

- The frontend can be deployed to Vercel using the `vercel.json` configuration.
- The backend can be deployed to Render using the `render.yaml` configuration.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.