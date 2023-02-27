const express = require("express");
const router = express.Router();
const controller = require("../controllers/public");

// for -get functions
router.get("/blogs", controller.getBlogs);
router.get("/categories", controller.getCategories);
router.get("/linktree", controller.getLinkTree);

module.exports = router;
