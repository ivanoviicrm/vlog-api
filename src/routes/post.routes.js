const router = require("express").Router();
const postController = require("../controllers/post.controller");
const userMiddlewares = require("../middleware/user.middleware");

router
  .route("/posts")
  .get(userMiddlewares.validateToken) // Necesitas un token válido para leer posts
  .get(postController.getAllPost);

module.exports = router;
