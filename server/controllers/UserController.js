import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import connect from '../connections/connect';
import { createUserData } from '../helper/instructions/userInstructions';
import ErrorHandler from '../helper/ErrorHandler';

const { handleDatabaseConnectionError, handleTableWriteError } = ErrorHandler;

dotenv.config();
/**
  * @class UserController
  *
  * @description CRUD operations on Users
  */
class UserController {
  /**
  * @description -This method signs up users into Maintenance-Tracker
  *
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  *
  * @returns {object} - status Message and signs up user into Maintenance-Tracker
  *
  * @description This controller authenticates a user during signup using jwt token.
  * @memberOf UserController
  * @static
  */
  static signupUser(req, res) {
    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;
    connect.query(createUserData(firstName, lastName, email, password, false))
      .then((data) => {
        const { id, email, admin } = data.rows[0];
        const payload = {
          id,
          email,
          adminStatus: admin
        };
        const token = jwt.sign({ payload }, process.env.PRIVATE_KEY, { expiresIn: 77 * 77 });
        return res.status(201).json({
          status: 'success',
          data: {
            message: 'you signed up successfully', token
          }
        });
      })
      .catch(err => handleTableWriteError(err, res));
  }
}

export default UserController;
