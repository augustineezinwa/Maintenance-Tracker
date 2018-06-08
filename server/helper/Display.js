
/**
 * @class Display
 *
 * @description handles display of data across maintenance-tracker application.
 */
class Display {
  /**
        * @description -This method takes care of displaying data to the client
        *
        * @param {object} data - The data payload sent back to the client
        * @param {object} res - The response object sent to this client
        *
        * @returns {object} - returns the response object to the client
        *
        * @memberOf Display class
        * @static
        */
  static displaySuccess(data, res) {
    return res.status(200).json({
      status: 'success',
      data: data.rows
    });
  }
}

export default Display;
