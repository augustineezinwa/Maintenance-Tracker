import express from 'express';
import RequestController from '../controllers/RequestController';
import RequestValidaton from '../middlewares/RequestValidaton';

const { getRequestById } = RequestController;
const { validateUrl } = RequestValidaton;
const requestRouter = express.Router();
requestRouter.get('/users/requests/:requestId', validateUrl, getRequestById);

export default requestRouter;
