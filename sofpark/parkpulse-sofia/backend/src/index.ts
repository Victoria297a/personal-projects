import express from 'express';
import cors from 'cors';
import parkingRoutes from './routes/parking';
import eventRoutes from './routes/events';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/parking-zones', parkingRoutes);
app.use('/api/events', eventRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});