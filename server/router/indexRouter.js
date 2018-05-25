import express from 'express';
import requestRouter from './requestRouter';
import databaseRouter from './databaseRouter';
import userRouter from './userRouter';

const indexRouter = express.Router();
indexRouter.use(userRouter);
indexRouter.use(requestRouter, databaseRouter);

export default indexRouter;
