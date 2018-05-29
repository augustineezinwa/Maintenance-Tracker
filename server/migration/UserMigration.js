import connect from '../connections/connect';
import { createUserTable } from '../helper/instructions/userInstructions';
import ErrorHandler from '../helper/ErrorHandler';

const { handleTableCreationError } = ErrorHandler;
/**
  * @class
  *
  * @description Checks the existence of a table
  */
class UserMigration {
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
  static migrateUser(req, res) {
    connect.query(createUserTable)
      .then(data => res.status(200).json({
        status: 'success',
        data: {
          message: 'successfully created table',
        }
      })).catch(err => handleTableCreationError(err, res));
  }
}

export default UserMigration;
