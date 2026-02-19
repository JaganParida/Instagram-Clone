const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const indentifyUser = require("../middlewares/auth.middleware")

/**
 * POST /api/posts/ [protected]
 *  - req.body = {caption, image-file}
 */

postRouter.post(
  "/",
  upload.single("image"), indentifyUser,
  postController.createPostController,
);

/**
 * GET /api/posts/ [protected]
 */

postRouter.get("/", indentifyUser, postController.getPostController);

/**
 * GET /api/posts/details/:postId
 * - return an detail about specific post with the id. also check whether the post belongs to the user that the request come from
 */

postRouter.get(
  "/details/:postId",
  indentifyUser,
  postController.getPostDetailsController,
);

module.exports = postRouter;
