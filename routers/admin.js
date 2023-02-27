const express = require("express");
const router = express.Router();
const controller = require("../controllers/admin");
const token = require("../middlewares/token");
const isAdmin = require("../middlewares/isAdmin");

// for -post functions
router.post(
  "/save-blog-cover-image",
  token,
  isAdmin,
  controller.postBlogCoverImage
);
router.post("/add-blog", token, isAdmin, controller.postAddBlog);
router.post("/edit-blog", token, isAdmin, controller.postEditBlog);
router.post("/delete-blog", token, isAdmin, controller.postDeleteBlog);
router.post("/add-link", token, isAdmin, controller.postAddLink);
router.post("/delete-link", token, isAdmin, controller.postDeleteLink);
router.post("/add-category", token, isAdmin, controller.postAddCategory);
router.post("/delete-category", token, isAdmin, controller.postDeleteCategory);

module.exports = router;
