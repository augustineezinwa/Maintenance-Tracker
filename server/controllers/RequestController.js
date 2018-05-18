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
    * @description This method updates a request by id in maintenance tracker
    * @memberOf RequestController
      */
  static updateRequest(req, res) {
    const newRequest = req.body;
    const id = req.params.requestId;
    let oldRequest = requests.find(request => +request.id === +id);
    if (oldRequest) {
      oldRequest = { ...oldRequest, ...newRequest };
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Request was successfully updated', oldRequest
        }
      });
    }
    return res.status(404).json({
      status: 'fail',
      data: {
        message: 'Request was not found'
      }
    });
  }
}

export default RequestController;

