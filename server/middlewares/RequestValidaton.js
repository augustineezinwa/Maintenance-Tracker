
/**
  * @class RequestController
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
}

export default RequestValidation;
