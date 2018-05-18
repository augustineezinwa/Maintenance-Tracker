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
}

export default RequestController;

