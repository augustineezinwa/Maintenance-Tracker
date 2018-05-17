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

