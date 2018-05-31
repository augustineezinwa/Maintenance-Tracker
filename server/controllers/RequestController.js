import connect from '../connections/connect';
import {
  findAllrequestsById, findRequestById, createRequestData,
  updateRequestData
} from '../helper/instructions/requestInstructions';
import ErrorHandler from '../helper/ErrorHandler';

const { handleTableReadError, handleTableWriteError } = ErrorHandler;
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
          return res.status(404).json({
            status: 'fail',
            data: {
              message: 'No request found at this time!'
            }
          });
        }
        return res.status(200).json({
          status: 'success',
          data: data.rows
        });
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
          return res.status(404).json({
            status: 'fail',
            data: {
              message: 'No request found at this time'
            }
          });
        }
        return res.status(200).json({
          status: 'success',
          data: data.rows
        });
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
      });
  }
}

export default RequestController;

