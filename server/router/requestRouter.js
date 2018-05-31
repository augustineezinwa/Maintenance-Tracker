import express from 'express';
import RequestController from '../controllers/RequestController';
import RequestValidation from '../middlewares/RequestValidaton';
import Authentication from '../middlewares/Authentication';

const { secureRoute } = Authentication;
const {
  createRequest, getRequestById,
  getAllRequests, updateRequest
} = RequestController;
const {
  validateUrl,
  validateRequestTitle,
  validateRequestMessage,
  validateRequestStatus,
  validateRequestType,
  validateRequestUpdate
} = RequestValidation;
const requestRouter = express.Router();
requestRouter.post(
  '/users/requests', secureRoute, validateRequestTitle,
  validateRequestType, validateRequestMessage, createRequest
);
requestRouter.get('/users/requests/:requestId', validateUrl, secureRoute, getRequestById);
requestRouter.get('/users/requests', secureRoute, getAllRequests);
requestRouter.put(
  '/users/requests/:requestId', validateUrl, secureRoute, validateRequestUpdate, validateRequestTitle,
  validateRequestType, validateRequestMessage, updateRequest
);

export default requestRouter;
