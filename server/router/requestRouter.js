import express from 'express';
import RequestController from '../controllers/RequestController';
import RequestValidation from '../middlewares/RequestValidaton';

const { createRequest, getRequestById, getAllRequests } = RequestController;
const {
  validateUrl,
  validateRequestTitle,
  validateRequestMessage,
  validateRequestStatus
} = RequestValidation;
const requestRouter = express.Router();
requestRouter.post(
  '/users/requests', validateRequestTitle, validateRequestMessage,
  validateRequestStatus, createRequest
);
requestRouter.get('/users/requests/:requestId', validateUrl, getRequestById);
requestRouter.get('/users/requests', getAllRequests);

export default requestRouter;
