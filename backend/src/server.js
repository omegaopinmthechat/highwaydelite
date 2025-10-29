import express from 'express';
import cors from 'cors';
import connectDB from './db/database.js';
import experienceRoutes from './routes/experienceRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import { PORT } from './config/env.js';

const app = express();
const PORT1 = process.env.PORT || 5500;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/experiences', experienceRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'api running' });
});



app.listen(PORT1, () => {
  console.log(`Server is running on port ${PORT}`);
});