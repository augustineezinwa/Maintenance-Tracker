
/**
 * @class ErrorHandler
 *
 * @description handles error across maintenance-tracker application.
 */
class ErrorHandler {
  /**
      * @description -This method takes care of any error resulting from connecting to a database
      *
      * @param {object} err - The response payload sent back to the middleware
      * @param {object} res - The error object sent to this method
      *
      * @returns {object} - returns the error object to the middleware
      *
      * @memberOf Error Handler class
      * @static
      */
  static handleDatabaseConnectionError(err, res) {
    return res.status(500).json({
      status: 'fail',
      data: {
        message: 'error connecting to the database'
      }
    });
  }
  /**
      * @description -This method takes care of any error resulting from writing to a table
      *
      * @param {object} err - The response payload sent back to the middleware
      * @param {object} res - The error object sent to this method
      *
      * @returns {object} - returns the error object to the middleware
      *
      * @memberOf Error Handler class
      * @static
      */
  static handleTableWriteError(err, res) {
    return res.status(500).json({
      status: 'fail',
      data: {
        message: 'error occured while writing to a table'
      }
    });
  }
  /**
      * @description -This method takes care of any error resulting from reading from a table
      *
      * @param {object} err - The response payload sent back to the middleware
      * @param {object} res - The error object sent to this method
      *
      * @returns {object} - returns the error object to the middleware
      *
      * @memberOf Error Handler class
      * @static
      */
  static handleTableReadError(err, res) {
    return res.status(500).json({
      status: 'fail',
      data: {
        message: 'error reading from database table'
      }
    });
  }
  /**
      * @description -This method takes care of any error resulting from creating a table
      *
      * @param {object} err - The response payload sent back to the middleware
      * @param {object} res - The error object sent to this method
      *
      * @returns {object} - returns the error object to the middleware
      *
      * @memberOf Error Handler class
      * @static
      */
  static handleTableCreationError(err, res) {
    return res.status(500).json({
      status: 'fail',
      data: {
        message: 'error creating table'
      }
    });
  }
}
export default ErrorHandler;
