import connect from '../connections/connect';
import { createRequestTable } from '../helper/instructions/requestInstructions';
import ErrorHandler from '../helper/ErrorHandler';

const { handleTableCreationError } = ErrorHandler;
/**
  * @class
  *
  * @description Checks the existence of a table
  */
class RequestMigration {
/**
    * @static
    *
    * @param {object} req - The request payload sent to the router
    * @param {object} res - The response payload sent back from the controller
    *
    * @returns {object} - status Message showing the result of the migration.
    *
    * @description This method migrates or creates a table in database
    * @memberOf migrateUser
    */
  static migrateRequest(req, res) {
    connect.query(createRequestTable)
      .then(data => res.status(200).json({
        status: 'success',
        data: {
          message: 'successfully created table',
        }
      })).catch(err => handleTableCreationError(err, res));
  }
}

export default RequestMigration;
