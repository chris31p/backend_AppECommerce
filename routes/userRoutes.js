const express = require('express');
const userRouter = express.Router();
const {registerUser, loginUser, verifyUser} = require('../controllers/userController');

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/verifyuser', verifyUser)

module.exports = userRouter;