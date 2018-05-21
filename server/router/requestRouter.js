import express from 'express';
import RequestController from '../controllers/RequestController';
import RequestValidation from '../middlewares/RequestValidaton';

const {
  createRequest, getRequestById,
  getAllRequests, updateRequest
} = RequestController;
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
requestRouter.put(
  '/users/requests/:requestId', validateUrl, validateRequestTitle,
  validateRequestStatus, validateRequestMessage, updateRequest
);

export default requestRouter;
