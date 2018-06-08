import InputFieldValidaton from '../helper/InputFieldValidaton';
import connect from '../connections/connect';
import ErrorHandler from '../helper/ErrorHandler';
import { findRequestById, findARequest } from '../helper/instructions/requestInstructions';

const { validateRequestMessage } = InputFieldValidaton;
const { handleTableReadError, handleNotFoundError } = ErrorHandler;
/**
  * @class RequestController
  *
  * @description CRUD operations on Requests
  */
class RequestValidation {
  /**
    * @static
    *
    * @param {object} req - The request payload sent to the router
    * @param {object} res - The response payload sent back from the controller
    * @param {function} next -The call back function that calls the next router
    *
    * @returns {object} - status Message and the particular request by id.

    * @description This method validates the input url against strange strings or bugs
    * @memberOf RequestController
    */
  static validateUrl(req, res, next) {
    const { requestId } = req.params;
    if ((!String(req.url).includes('$$') || !String(req.url).includes('##')
    || !String(req.url).includes('&&'))
    && (Number.isFinite(Number(requestId)))) {
      return next();
    }
    return res.status(404).json({
      status: 'fail',
      data: {
        message: 'url not recognized!'
      }
    });
  }
  /**
    * @static
    *
    * @param {object} req - The request payload sent to the router
    * @param {object} res - The response payload sent back from the controller
    * @param {function} next -The call back function that calls the next router
    *
    * @returns {object} - status Message and the particular request by id.
    *
    * @description This method validates a request title in maintenance tracker
    * @memberOf RequestController
    */
  static validateRequestTitle(req, res, next) {
    let { requestTitle } = req.body;
    requestTitle = typeof requestTitle === 'string' ? requestTitle.trim() : '';
    requestTitle = validateRequestMessage(requestTitle);
    if (!requestTitle.status) {
      const newRequestTitle = requestTitle.replace('Message', 'Request Title');
      return res.status(400).json({
        status: 'fail',
        data: {
          message: newRequestTitle
        }
      });
    }
    return next();
  }
  /**
    * @static
    *
    * @param {object} req - The request payload sent to the router
    * @param {object} res - The response payload sent back from the controller
    * @param {function} next -The call back function that calls the next router
    *
    * @returns {object} - status Message and the particular request by id.
    *
    * @description This method vaidates a request type in maintenance tracker
    * @memberOf RequestController
    */
  static validateRequestType(req, res, next) {
    let { requestType } = req.body;
    requestType = typeof requestType === 'string' ? requestType.trim() : '';
    if ((requestType.toLowerCase() !== 'maintenance') && (requestType.toLowerCase() !== 'repair')) {
      return res.status(400).json({
        status: 'fail',
        data: {
          message: 'Request type can only be maintenance or repair'
        }
      });
    }
    return next();
  }
  /**
    * @static
    *
    * @param {object} req - The request payload sent to the router
    * @param {object} res - The response payload sent back from the controller
    * @param {function} next -The call back function that calls the next router
    *
    * @returns {object} - returns to the next router
    *
    * @description This method validates a request message
    * @memberOf RequestController
    */
  static validateRequestMessage(req, res, next) {
    const { message } = req.body;
    const newMessage = validateRequestMessage(message);
    if (!newMessage.status) {
      return res.status(400).json({
        status: 'fail',
        data: {
          message: newMessage
        }
      });
    }
    return next();
  }
  /**
    * @static
    *
    * @param {object} req - The request payload sent to the router
    * @param {object} res - The response payload sent back from the controller
    * @param {function} next -The call back function that calls the next router
    *
    * @returns {object} - status message or a callback to the next middleware
    *
    * @description This method validates the status of every requests in maintenance
    * tracker before update
    * @memberOf RequestController
    */
  static validateRequestUpdate(req, res, next) {
    const { id } = req;
    const { requestId } = req.params;
    connect.query(findRequestById(requestId, id))
      .then((data) => {
        if (data.rows.length < 1) {
          return res.status(404).json({
            status: 'fail',
            data: {
              message: 'Cant update! Cant find request!'
            }
          });
        }
        const {
          approved, requesttitle, requesttype, message
        } = data.rows[0];
        const oldRequest = {
          requestTitle: requesttitle,
          requestType: requesttype,
          message
        };
        const request = req.body;
        const newRequest = { ...oldRequest, ...request };
        if (approved !== 'success') {
          req.body = newRequest;
          req.id = id;
          return next();
        }
        return res.status(403).json({
          status: 'fail',
          data: {
            message: 'Action forbidden! Request is already approved!'
          }
        });
      }).catch(err => handleTableReadError(err, res));
  }
  /**
    * @static
    *
    * @param {object} req - The request payload sent to the router
    * @param {object} res - The response payload sent back from the controller
    * @param {function} next -The call back function that calls the next router
    *
    * @returns {object} - status message or a callback to the next middleware
    *
    * @description This method checks for the presence of a request in maintenance
    * tracker before admin's approval
    * @memberOf RequestController
    */
  static checkRequest(req, res, next) {
    const { requestId } = req.params;
    connect.query(findARequest(requestId))
      .then((data) => {
        if (data.rows.length < 1) {
          return handleNotFoundError(res);
        }
        req.approved = data.rows[0].approved;
        req.rejected = data.rows[0].rejected;
        req.resolved = data.rows[0].resolved;
        return next();
      });
  }
}
export default RequestValidation;

