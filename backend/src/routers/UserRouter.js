const express = require('express')
const userController = require ('../controllers/UserController')
const userRouter = express.Router()
const upload = require('../middleware/upload')

userRouter.post('/register', upload.single('picture'), userController.createUser);
userRouter.post('/login', userController.loginUser);
userRouter.get('/:id', userController.getUserById);
userRouter.put('/:id',upload.single('picture'), userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.get('/',userController.getAllUsers);


module.exports = userRouter;
