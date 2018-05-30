import express from 'express';
import UserController from '../controllers/UserController';
import UserValidation from '../middlewares/UserValidation';

const { validatesignUp, checkEmail } = UserValidation;
const { signupUser, loginUser } = UserController;
const userRouter = express.Router();

userRouter.post('/auth/signup', validatesignUp, checkEmail, signupUser);
userRouter.post('/auth/login', loginUser);

export default userRouter;
