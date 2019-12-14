const router = require('express').Router();
const userController = require('../controllers/user.controller');

router
  .route('/users/register')
  .post(userController.register)

router
  .route('/users/login')
  .post(userController.login)

module.exports = router;
