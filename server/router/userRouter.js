import express from 'express';
import UserController from '../controllers/UserController';
import UserValidation from '../middlewares/UserValidation';
import Authentication from '../middlewares/Authentication';

const { validatesignUp, checkEmail } = UserValidation;
const { signupUser, loginUser, validateToken, getUserProfile } = UserController;
const { secureRoute, secureMasterRoute } = Authentication;
const userRouter = express.Router();

userRouter.post('/auth/signup', validatesignUp, checkEmail, signupUser);
userRouter.post('/auth/login', loginUser);
userRouter.post('/auth/validateToken', secureRoute, validateToken);
userRouter.get('/auth/users/:userId', secureRoute, secureMasterRoute, getUserProfile);

export default userRouter;
