import express from 'express';
import RequestController from '../controllers/RequestController';

const { getAllRequests } = RequestController;
const requestRouter = express.Router();

requestRouter.get('/users/requests', getAllRequests);

export default requestRouter;
