import bcrypt from 'bcrypt';
import { validationErrors } from 'express-validator/check';
import InputFieldValidation from '../helper/InputFieldValidaton';
import connect from '../connections/connect';
import { findEmail } from '../helper/instructions/userInstructions';
import ErrorHandler from '../helper/ErrorHandler';

const { handleDatabaseConnectionError, handleTableReadError } = ErrorHandler;

/**
 * @class UserInputValidaton
 *
 * @description Validation operations on Users.
 */
class UserValidation {
/**
  * @description -This method validates users in Maintenance-Tracker
  *
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @param {function} next
  *
  * @returns {object} - status Message and validates users before signup in maintenance-tracker
  * @memberOf UserController
  * @static
  */
  static validatesignUp(req, res, next) {
    req.checkBody('firstName', 'enter a valid name').matches(/^[a-zA-Z]+$/);
    req.checkBody('lastName', 'enter a valid name').matches(/^[a-zA-Z]+$/);
    req.checkBody('email', 'enter a valid email-address').isEmail();
    req.checkBody('password', 'password cant be empty').exists();
    req.checkBody('password', 'password must contain a number or special character').matches(/^(?=.*\d)(?=.*[a-zA-Z])/);
    req.checkBody('password', 'password must contain at least six characters').isLength({ min: 6 });
    req.checkBody('confirmpassword', 'password cant be empty').exists();
    req.checkBody('confirmpassword', 'password must contain a number or special character').matches(/^(?=.*\d)(?=.*[a-zA-Z])/);
    req.checkBody('confirmpassword', 'password must contain at least six characters').isLength({ min: 6 });
    req.checkBody('confirmpassword', 'password does not match').equals(req.body.password);
    const errors = req.validationErrors();
    if (!errors) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      req.body.confrimpassword = bcrypt.hashSync(req.body.confirmpassword, 10);
      return next();
    }
    const newErrors = errors.map((err) => { const error = { field: err.param, message: err.msg }; return error; });
    return res.status(422).json({
      status: 'fail',
      data: newErrors,
    });
  }

  /**
  * @description -This method checks if an email is existing in Maintenance Tracker
  *
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @param {function} next
  *
  * @returns {object} - status Message stating if mail is in use or not.
  * @memberOf Uservalidation class
  * @static
  */
  static checkEmail(req, res, next) {
    const { email } = req.body;
    connect.query(findEmail(email))
      .then((data) => {
        if (data.rows.length < 1) {
          return next();
        }
        return res.status(409).json({
          status: 'fail',
          data: {
            message: 'email already exist'
          }
        });
      })
      .catch(err => handleTableReadError(err, res));
  }
}

export default UserValidation;
