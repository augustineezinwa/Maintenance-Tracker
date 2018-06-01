import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
  * @class Authentication
  * @description Verifies json authentication
  */
class Authentication {
/**
  * @description -This method verifies a user action before accessing any protected route.
  *
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the secureRoute middleware
  * @param {object} next - The request payload sent to the next middleware in the stack.
  *
  * @returns {object} - status Message and verifies a token from a user, granting access.
  * @memberOf Authentication
  * @static
  */
  static secureRoute(req, res, next) {
    const token = req.body.token || req.query.token || req.headers.authorization;
    if (!token) {
      return res.status(403).json({
        status: 'fail',
        data: {
          message: 'Forbidden!, please sign up or login!'
        }
      });
    }
    jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 'fail',
          data: {
            message: 'Unauthorized! please provide valid credentials to continue'
          }
        });
      }
      const { id, adminStatus, email } = decoded.payload;
      req.id = id;
      req.admin = adminStatus;
      req.email = email;
      return next();
    });
  }
  /**
  * @description -This method verifies a user action before accessing any protected route.
  *
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the secureRoute middleware
  * @param {object} next - The request payload sent to the next middleware in the stack.
  *
  * @returns {object} - status Message and verifies a token from a user, granting access.
  * @memberOf Authentication
  * @static
  */
  static secureMasterRoute(req, res, next) {
    if (req.admin !== true) {
      return res.status(401).json({
        status: 'fail',
        data: {
          message: 'Unauthorized! You dont possess Admin privileges!'
        }
      });
    }
    return next();
  }
}

export default Authentication;
