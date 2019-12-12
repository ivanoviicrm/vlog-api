const router = require('express').Router();
const postController = require('../controllers/post.controller')

router
  .route('/posts')
  .get(postController.getAllPost);

module.exports = router;
