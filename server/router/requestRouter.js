import express from 'express';
import RequestController from '../controllers/RequestController';
import RequestValidaton from '../middlewares/RequestValidaton';

const { createRequest } = RequestController;
const {
  validateRequestTitle,
  validateRequestMessage,
  validateRequestStatus
} = RequestValidaton;
const requestRouter = express.Router();
requestRouter.post(
  '/users/requests', validateRequestTitle, validateRequestMessage,
  validateRequestStatus, createRequest
);

export default requestRouter;
