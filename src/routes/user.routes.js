const router = require('express').Router();
const userController = require('../controllers/user.controller');

router
  .route('/users')
  .get(userController.register)

module.exports = router;
