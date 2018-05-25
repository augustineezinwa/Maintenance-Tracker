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
    if (token) {
      jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status: 'fail',
            data: {
              message: 'You are not allowed to access this route, Failed to authenticate!'
            }

          });
        }
        req.decoded = decoded;
        req.id = req.params.businessId;
        return next();
      });
    }
    if (!token) {
      return res.status(403).send({
        status: 'fail',
        data: {
          message: 'You are forbidden from accessing this route! No token! You need to sign up!'
        }

      });
    }
  }
}

export default Authentication;
