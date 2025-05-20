import express from 'express';
import authRoute from './interfaces/routes/auth.route';
import { errorHandler } from './interfaces/middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use("/auth", authRoute);
app.use(errorHandler);
export default app;