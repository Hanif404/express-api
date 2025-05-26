import express from 'express';
import authRoute from './interfaces/routes/auth.route';
import userRoute from './interfaces/routes/user.route';
import { errorHandler, successHandler } from './interfaces/middlewares/responseHandler';

const app = express();

app.use(express.json());
app.use(successHandler);
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use(errorHandler);
export default app;