import express from 'express';
import requestRouter from './requestRouter';

const indexRouter = express.Router();
indexRouter.use(requestRouter);

export default indexRouter;
