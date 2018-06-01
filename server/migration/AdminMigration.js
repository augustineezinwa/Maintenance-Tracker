import bcrypt from 'bcrypt';
import connect from '../connections/connect';
import { createUserData } from '../helper/instructions/userInstructions';
import ErrorHandler from '../helper/ErrorHandler';

const { handleTableWriteError } = ErrorHandler;
/**
  * @class
  *
  * @description Checks the existence of a table
  */
class AdminMigration {
/**
    * @static
    *
    * @param {object} req - The request payload sent to the router
    * @param {object} res - The response payload sent back from the controller
    *
    * @returns {object} - status Message showing the result of the migration.
    *
    * @description This method migrates an admin into the database
    * @memberOf migrateUser
    */
  static migrateAdmin(req, res) {
    connect.query(createUserData(
      'Augustine', 'Ezinwa',
      'augustineezinwa@gmail.com', bcrypt.hashSync(process.env.MASTER_PASSWORD, 10), true
    ))
      .then(data => res.status(200).json({
        status: 'success',
        data: {
          message: 'Congratulations Augustine! You are now the admin of Maintenance-Tracker',
        }
      })).catch(err => handleTableWriteError(err, res));
  }
}

export default AdminMigration;
