const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const indentifyUser = require("../middlewares/auth.middleware");

/**
 * @route POST /api/posts/ [protected]
 * @description Create a new post. The request should include the post content and an optional image. The user must be authenticated to create a post.
 */

postRouter.post(
  "/",
  upload.single("image"),
  indentifyUser,
  postController.createPostController,
);

/**
 * @route GET /api/posts/ [protected]
 * @description Retrieve a list of posts. The response should include the post content, the author's username, and the number of likes. The user must be authenticated to view the posts.
 */

postRouter.get("/", indentifyUser, postController.getPostController);

/**
 * @route GET /api/posts/details/:postId
 * @description Return an detail about specific post with the id. also check whether the post belongs to the user that the request come from
 */

postRouter.get(
  "/details/:postId",
  indentifyUser,
  postController.getPostDetailsController,
);

/**
 * @route POST /api/posts/like/:postId [protected]
 * @description Like a post with the id provided in the request params
 */
postRouter.post(
  "/like/:postId",
  indentifyUser,
  postController.likePostController,
);

module.exports = postRouter;
