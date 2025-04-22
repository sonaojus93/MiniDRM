import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin';
import videoRoutes from './routes/video';
import licenseRoutes from './routes/license';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/license', licenseRoutes);

export default app;