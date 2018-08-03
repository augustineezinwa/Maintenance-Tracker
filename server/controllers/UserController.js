import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import connect from '../connections/connect';
import { createUserData, findEmail, findUser } from '../helper/instructions/userInstructions';
import ErrorHandler from '../helper/ErrorHandler';

const { handleTableWriteError, handleTableReadError } = ErrorHandler;

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
        const {
          id, email, admin, firstname
        } = data.rows[0];
        const payload = {
          id,
          email,
          adminStatus: admin
        };
        const token = jwt.sign({ payload }, process.env.PRIVATE_KEY, { expiresIn: 77 * 77 });
        return res.status(201).json({
          status: 'success',
          data: {
            message: `${firstname}, you signed up successfully`, token
          }
        });
      })
      .catch(err => handleTableWriteError(err, res));
  }
  /**
  * @description -This method logins users and admin into Maintenance-Tracker
  *
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  *
  * @returns {object} - status Message and logins user into Maintenance-Tracker
  *
  * @description This controller authenticates a user during login using jwt token.
  * @memberOf UserController
  * @static
  */
  static loginUser(req, res) {
    connect.query(findEmail(req.body.email))
      .then((data) => {
        const {
          id, email, admin, password
        } = data.rows[0];
        const payload = {
          id,
          email,
          adminStatus: admin
        };
        if (bcrypt.compareSync(req.body.password, password)) {
          const token = jwt.sign({ payload }, process.env.PRIVATE_KEY, { expiresIn: 77 * 77 });
          const name = admin ? 'Admin' : data.rows[0].firstname;
          return res.status(200).json({
            status: 'success',
            data: {
              message: `${name}, you are logged in`, token
            }
          });
        }
        return res.status(401).json({
          status: 'fail',
          data: {
            message: 'password is incorrect!'
          }
        });
      }).catch((err) => {
        res.status(404).json({
          status: 'fail',
          data: {
            message: 'you cant login at this time, email doesnt exist'
          }
        });
        console.log(err);
      });
  }
  /**
  * @description -This method checks if a user's season is valid
  *
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  *
  * @returns {object} - status Message and checks the validity of a user's token in Maintenance-Tracker
  *
  * @description This controller validates a user's token.
  * @memberOf UserController
  * @static
  */
  static validateToken(req, res) {
    return res.json({
      status: 'success',
      data: {
        message: 'you are logged in',
        adminStatus: req.admin
      }
    });
  }

  /**
  * @description -This method checks get the profile of any user
  *
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  *
  * @returns {object} - returns user details to admin
  *
  * @description This method fetches user details for the admin.
  * @memberOf UserController
  * @static
  */
  static getUserProfile(req, res) {
    connect.query(findUser(req.params.userId))
      .then((data) => {
        const {
          id,
          email,
          firstname,
          lastname
        } = data.rows[0];
        if (data.rows.length < 1) {
          return res.status(404).json({
            status: 'fail',
            data: {
              message: 'user cant be found!'
            }
          });
        }
        return res.status(200).json({
          status: 'success',
          data: {
            id,
            firstname,
            lastname,
            email
          }
        });
      })
      .catch(err => handleTableReadError(err, res));
  }
}

export default UserController;
