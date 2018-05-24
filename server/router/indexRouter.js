import express from 'express';
import requestRouter from './requestRouter';
import databaseRouter from './databaseRouter';

const indexRouter = express.Router();
indexRouter.use(requestRouter, databaseRouter);

export default indexRouter;
