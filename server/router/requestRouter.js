import express from 'express';
import RequestController from '../controllers/RequestController';
import RequestValidation from '../middlewares/RequestValidaton';
import Authentication from '../middlewares/Authentication';

const { secureRoute, secureMasterRoute } = Authentication;
const {
  createRequest, getRequestById,
  getAllRequests, updateRequest, getAllRequestsByAdmin,
  getARequestByAdmin,
  approveRequest,
  disapproveRequest,
  resolveRequest,
  deleteRequest
} = RequestController;
const {
  checkRequest,
  validateUrl,
  validateRequestTitle,
  validateRequestMessage,
  validateRequestType,
  validateRequestUpdate
} = RequestValidation;
const requestRouter = express.Router();
requestRouter.post(
  '/users/requests', secureRoute, validateRequestTitle,
  validateRequestType, validateRequestMessage, createRequest
);
requestRouter.get('/users/requests/:requestId', validateUrl, secureRoute, getRequestById);
requestRouter.get('/requests', secureRoute, secureMasterRoute, getAllRequestsByAdmin);
requestRouter.get('/requests/:requestId', secureRoute, secureMasterRoute, getARequestByAdmin);
requestRouter.get('/users/requests', secureRoute, getAllRequests);
requestRouter.put('/requests/:requestId/approve', secureRoute, secureMasterRoute, checkRequest, approveRequest);
requestRouter.put('/requests/:requestId/disapprove', secureRoute, secureMasterRoute, checkRequest, disapproveRequest);
requestRouter.put('/requests/:requestId/resolve', secureRoute, secureMasterRoute, checkRequest, resolveRequest);
requestRouter.put(
  '/users/requests/:requestId', validateUrl, secureRoute, validateRequestUpdate, validateRequestTitle,
  validateRequestType, validateRequestMessage, updateRequest
);
requestRouter.delete('/users/requests/:requestId', validateUrl, secureRoute, checkRequest, deleteRequest);

export default requestRouter;
