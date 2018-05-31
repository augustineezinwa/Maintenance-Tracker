import InputFieldValidaton from '../helper/InputFieldValidaton';

const { validateRequestMessage, validateStatus } = InputFieldValidaton;
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
    * @returns {object} - status Message and the particular request by id.
    *
    * @description This method validates the status of every requests in maintenance tracker
    * @memberOf RequestController
    */
  static validateRequestStatus(req, res, next) {
    const {
      resolved,
      approved,
      rejected
    } = req.body;
    const resolvedStatus = !validateStatus(resolved) ? 'resolved' : '';
    const approvedStatus = !validateStatus(approved) ? 'approved' : '';
    const rejectedStatus = !validateStatus(rejected) ? 'rejected' : '';
    if (resolvedStatus === 'resolved'
    || approvedStatus === 'approved'
    || rejectedStatus === 'rejected') {
      return res.status(400).json({
        status: 'fail',
        data: {
          message: `The ${resolvedStatus ||
            approvedStatus ||
            rejectedStatus} status field can only be success or fail`
        }
      });
    }
    return next();
  }
}

export default RequestValidation;

