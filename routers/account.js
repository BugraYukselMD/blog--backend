const express = require("express");
const router = express.Router();
const controller = require("../controllers/account");
const token = require("../middlewares/token");

// for -get functions
router.get("/check-token", token, controller.checkToken);

// for -post functions
router.post("/save-user-image", token, controller.postUserImage);
router.post("/login", controller.postLogin);
router.post("/register", controller.postRegister);
router.post("/send-comment", token, controller.postComment);
router.post("/send-reply", token, controller.postReply);
router.post("/delete-comment", token, controller.deleteComment);
router.post("/delete-reply", token, controller.deleteReply);
router.post("/add-favourite", token, controller.addFavourite);
router.post("/remove-favourite", token, controller.removeFavourite);
router.post("/edit-profile", token, controller.editProfile);

module.exports = router;
