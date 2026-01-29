const express = require('express');
const cors = require('cors');
const parkingRoutes = require('./routes/parking');
const eventsRoutes = require('./routes/events');
const locationsRoutes = require('./routes/locations');
const predictionsRoutes = require('./routes/predictions');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/parking-zones', parkingRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/predictions', predictionsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ParkPulse Sofia API is running' });
});

app.listen(PORT, () => {
  console.log(`🚗 ParkPulse Sofia Backend running on port ${PORT}`);
});

module.exports = app;
