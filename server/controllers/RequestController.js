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
}

export default RequestController;

