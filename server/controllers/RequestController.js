import { requests } from '../dummydatabase/dummydatabase';
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
    const recievedRequest = requests.find(request => +request.id === +requestId);
    if (recievedRequest) {
      return res.status(200).json({
        status: 'success',
        data: recievedRequest
      });
    }
    return res.status(404).json({
      status: 'fail',
      data: { message: 'Request not found!' }
    });
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
    if (requests.length < 1) {
      return res.status(404).json({
        status: 'fail',
        data: {
          message: 'requests not found!'
        }
      });
    }
    return res.status(200).json({
      status: 'success',
      data: requests
    });
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
    const newRequest = req.body;
    let { id } = requests[requests.length - 1];
    id = id ? id += 1 : 1;
    requests.push({ id, ...newRequest });
    return res.status(201).json({
      status: 'success',
      data: {
        message: 'Request was created successfully', newRequest
      }
    });
  }
}

export default RequestController;

