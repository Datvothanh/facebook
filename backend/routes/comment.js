const express = require("express");
const { comment , getComment ,commentInComment , getCommentInComment} = require("../controllers/comment");
const { authUser } = require("../middlwares/auth");

const router = express.Router();
router.put("/comment", authUser, comment);
router.put("/commentInComment", authUser, commentInComment);
router.get("/getComment/:id", authUser, getComment);
router.get("/getCommentInComment/:id", authUser, getCommentInComment);
module.exports = router;
