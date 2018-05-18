import express from 'express';
import RequestController from '../controllers/RequestController';
import RequestValidaton from '../middlewares/RequestValidaton';

const { updateRequest } = RequestController;
const {
  validateUrl, validateRequestTitle, validateRequestMessage,
  validateRequestStatus
} = RequestValidaton;
const requestRouter = express.Router();

requestRouter.put(
  '/users/requests/:requestId', validateUrl, validateRequestTitle,
  validateRequestStatus, validateRequestMessage, updateRequest
);

export default requestRouter;
