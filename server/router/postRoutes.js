const express = require("express");
const {
  allPostController,
  createPostController,
  updatePostController,
  deletePostController,
  testPostController,
  onePostController,
  getSinglePostController,
  getPostImageController,
  getPostAuthorController,
  myPostController,
} = require("../controller/postController");
const { requireSignIn } = require("../middleware/authMiddleware");
const formidable = require("express-formidable");

const router = express.Router();

// create blog
router.post("/create-blog", requireSignIn, formidable(), createPostController);

// get all blogs
router.get("/all-blog", allPostController);

// get single blog
router.get("/blog/:id", getSinglePostController);

// delete blog
router.delete("/delete-blog/:id", requireSignIn, formidable(),deletePostController);

// router.get("/blog-author/:id",getPostAuthorController)

router.get("/my-blog/:id",myPostController)

// get blog image
router.get("/blog-image/:id", getPostImageController);

// update a blog
router.put(
  "/update-blog/:pid",
  requireSignIn,
  formidable(),
  updatePostController
);

// delete a blog
router.delete("/delete-blog/:id", requireSignIn, deletePostController);

router.get("/test", requireSignIn, testPostController);

module.exports = router;
