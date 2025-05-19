import express from 'express';
import user from './routes/userRouter';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use('/api/user/v1', user);
app.use(errorHandler);
export default app;