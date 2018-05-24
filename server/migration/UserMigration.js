import pool from '../connections/pool';
import { createUserTable } from '../helper/instructions/userInstructions';
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
    pool.connect((err, client, done) => {
      if (err) {
        return res.status(500).json({
          status: 'fail',
          data: {
            message: 'Cant connect to database'
          }
        });
      }
      client.query(createUserTable, (err) => {
        done();
        if (err) {
          return res.status(500).json({
            status: 'fail',
            data: {
              message: 'cant write to table'
            }
          });
        }
        return res.status(200).json({
          status: 'success',
          data: {
            message: 'Successfully created table'

          }
        });
      });
    });
  }
}

export default UserMigration;
