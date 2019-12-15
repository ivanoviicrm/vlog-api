const router = require('express').Router();
const userController = require('../controllers/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router
  .route('/users/register')
  .post(
    userMiddleware.validateRegisterBody,
    userMiddleware.isUserAlreadyRegistered,
    userMiddleware.encryptPassword,
    userController.register
  )

router
  .route('/users/login')
  .post(
    userMiddleware.validateLoginBody,
    userMiddleware.validateEmailInLogin,
    userMiddleware.validatePasswordInLogin,
    userController.login
  )

module.exports = router;
