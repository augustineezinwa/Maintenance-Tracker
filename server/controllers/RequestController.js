import connect from '../connections/connect';
import ErrorHandler from '../helper/ErrorHandler';
import Display from '../helper/Display';
import {
  findAllrequestsById, findRequestById, createRequestData, deleteRequestData,
  updateRequestData, findAllrequests, findARequest, updateApprovedRequestData,
  updateDisapprovedRequestData, updateResolvedRequestData
} from '../helper/instructions/requestInstructions';

const { displaySuccess } = Display;
const { handleTableReadError, handleTableWriteError, handleNotFoundError } = ErrorHandler;
/**
  * @class RequestController
  *
  * @description CRUD operations on Requests
  */
class RequestController {
/**
    * @static
    *
    * @param {object} req - The request payload sent to the router
    * @param {object} res - The response payload sent back from the controller
    *
    * @returns {object} - status Message and the particular request by id.
    *
    * @description This method gets a request by id in maintenance tracker
    * @memberOf RequestController
    */
  static getRequestById(req, res) {
    const { requestId } = req.params;
    const { id } = req;
    connect.query(findRequestById(requestId, id))
      .then((data) => {
        if (data.rows.length < 1) {
          return handleNotFoundError(res);
        }
        return displaySuccess(data, res);
      }).catch(err => handleTableReadError(err, res));
  }

  /**
        * @static
        *
        * @param {object} req - The request payload sent to the router
        * @param {object} res - The response payload sent back from the controller
        *
        * @returns {object} - status Message and the all requests that belongs to a user
        *
        * @description This method gets all requests in maintenance tracker
        * @memberOf RequestController
        */
  static getAllRequests(req, res) {
    const { id } = req;
    connect.query(findAllrequestsById(id))
      .then((data) => {
        if (data.rows.length < 1) {
          return handleNotFoundError(res);
        }
        return displaySuccess(data, res);
      })
      .catch(err => handleTableReadError(err, res));
  }
  /**
        * @static
        *
        * @param {object} req - The request payload sent to the router
        * @param {object} res - The response payload sent back from the controller
        *
        * @returns {object} - status Message and all requests in Maintenance-Tracker
        *
        * @description This method gets all requests in maintenance tracker
        * @memberOf RequestController
        */
  static getAllRequestsByAdmin(req, res) {
    connect.query(findAllrequests())
      .then((data) => {
        if (data.rows.length < 1) {
          return handleNotFoundError(res);
        }
        return displaySuccess(data, res);
      })
      .catch(err => handleTableReadError(err, res));
  }
  /**
        * @static
        *
        * @param {object} req - The request payload sent to the router
        * @param {object} res - The response payload sent back from the controller
        *
        * @returns {object} - status Message and all requests in Maintenance-Tracker
        *
        * @description This method gets all requests in maintenance tracker
        * @memberOf RequestController
        */
  static getARequestByAdmin(req, res) {
    const { requestId } = req.params;
    connect.query(findARequest(requestId))
      .then((data) => {
        if (data.rows.length < 1) {
          return handleNotFoundError(res);
        }
        return displaySuccess(data, res);
      })
      .catch(err => handleTableReadError(err, res));
  }
  /**
      * @static
      *
      * @param {object} req - The request payload sent to the router
      * @param {object} res - The response payload sent back from the controller
      *
      * @returns {object} - status Message and the particular request created.
      *
      * @description This method creates a request in maintenance tracker
      * @memberOf RequestController
        */
  static createRequest(req, res) {
    const { requestTitle, requestType, message } = req.body;
    const { id } = req;
    connect.query(createRequestData(requestTitle, requestType, message, id))
      .then((data) => {
        const { resolved, rejected, approved } = data.rows[0];
        res.status(201).json({
          status: 'success',
          data: {
            message: 'request was created successfully',
            request: {
              id: data.rows[0].id,
              requestTitle,
              requestType,
              message,
              approved,
              rejected,
              resolved
            }
          }
        });
      }).catch(err => handleTableWriteError(err, res));
  }
  /**
* @static
*
* @param {object} req - The request payload sent to the router
* @param {object} res - The response payload sent back from the controller
*
* @returns {object} - status Message and the particular request by id.
*
* @description This method updates a request by id in maintenance tracker
* @memberOf RequestController
*/
  static updateRequest(req, res) {
    const { requestTitle, requestType, message } = req.body;
    const { requestId } = req.params;
    const { id } = req;
    connect.query(updateRequestData(requestTitle, requestType, message, id, requestId))
      .then((data) => {
        const { resolved, rejected, approved } = data.rows[0];
        res.status(200).json({
          status: 'success',
          data: {
            message: 'request was updated successfully',
            request: {
              id: data.rows[0].id,
              requestTitle,
              requestType,
              message,
              approved,
              rejected,
              resolved
            }
          }
        });
      }).catch(err => handleTableWriteError(err, res));
  }
  /**
* @static
*
* @param {object} req - The request payload sent to the router
* @param {object} res - The response payload sent back from the controller
*
* @returns {object} - status Message or the approved request object.
*
* @description This method allows the admin to approve a request in maintenance tracker
* @memberOf RequestController
*/
  static approveRequest(req, res) {
    const { requestId } = req.params;
    const { approved, rejected } = req;
    if (approved !== 'pending' && rejected !== 'pending') {
      return res.status(403).json({
        status: 'fail',
        data: {
          message: 'Action forbidden! This request has already been approved or rejected.'
        }
      });
    }
    connect.query(updateApprovedRequestData(requestId))
      .then((data) => {
        res.status(200).json({
          status: 'success',
          data: {
            message: 'request was approved successfully',
            request: {
              id: data.rows[0].id,
              requestTitle: data.rows[0].requesttitle,
              requestType: data.rows[0].requesttype,
              message: data.rows[0].message,
              approved: data.rows[0].approved,
              rejected: data.rows[0].rejected,
              resolved: data.rows[0].resolved
            }
          }
        });
      }).catch(err => handleTableWriteError(err, res));
  }
  /**
* @static
*
* @param {object} req - The request payload sent to the router
* @param {object} res - The response payload sent back from the controller
*
* @returns {object} - status Message or the approved request object.
*
* @description This method allows the admin to disapprove a request in maintenance tracker
* @memberOf RequestController
*/
  static disapproveRequest(req, res) {
    const { requestId } = req.params;
    const { approved, rejected } = req;
    if (approved !== 'pending' && rejected !== 'pending') {
      return res.status(403).json({
        status: 'fail',
        data: {
          message: 'Action forbidden! This request has already been approved or rejected.'
        }
      });
    }
    connect.query(updateDisapprovedRequestData(requestId))
      .then((data) => {
        res.status(200).json({
          status: 'success',
          data: {
            message: 'This request has been disapproved successfully',
            request: {
              id: data.rows[0].id,
              requestTitle: data.rows[0].requesttitle,
              requestType: data.rows[0].requesttype,
              message: data.rows[0].message,
              approved: data.rows[0].approved,
              rejected: data.rows[0].rejected,
              resolved: data.rows[0].resolved
            }
          }
        });
      }).catch(err => handleTableWriteError(err, res));
  }
  /**
* @static
*
* @param {object} req - The request payload sent to the router
* @param {object} res - The response payload sent back from the controller
*
* @returns {object} - status Message or the resolved request object.
*
* @description This method allows the admin to resolve a request in maintenance tracker
* @memberOf RequestController
*/
  static resolveRequest(req, res) {
    const { requestId } = req.params;
    const { approved, rejected, resolved } = req;
    if ((approved === 'pending' && rejected === 'pending') || resolved === 'fail') {
      return res.status(403).json({
        status: 'fail',
        data: {
          message: 'Action forbidden! You cant resolve an unapproved request!.'
        }
      });
    }
    connect.query(updateResolvedRequestData(requestId))
      .then((data) => {
        res.status(200).json({
          status: 'success',
          data: {
            message: 'This request has been resolved successfully',
            request: {
              id: data.rows[0].id,
              requestTitle: data.rows[0].requesttitle,
              requestType: data.rows[0].requesttype,
              message: data.rows[0].message,
              approved: data.rows[0].approved,
              rejected: data.rows[0].rejected,
              resolved: data.rows[0].resolved
            }
          }
        });
      }).catch(err => handleTableWriteError(err, res));
  }
  /**
* @static
*
* @param {object} req - The request payload sent to the router
* @param {object} res - The response payload sent back from the controller
*
* @returns {object} - status Message
*
* @description This method allows the user to delete a particular request in maintenance tracker
* @memberOf RequestController
*/
  static deleteRequest(req, res) {
    const { requestId } = req.params;
    const { approved, id } = req;
    if (approved === 'success') {
      return res.status(403).json({
        status: 'fail',
        data: {
          message: 'Action forbidden! You cant delete an approved request!.'
        }
      });
    }
    connect.query(deleteRequestData(id, requestId))
      .then((data) => {
        res.status(200).json({
          status: 'success',
          data: {
            message: 'This request has been successfully deleted',
          }
        });
      })
      .catch(err => handleTableReadError(err, res));
  }
}
export default RequestController;

