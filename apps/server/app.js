import express from 'express';
import cors from 'cors';
import { filesRoutes } from './routes/files.route.js';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use(filesRoutes());

export default app;