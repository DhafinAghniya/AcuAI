const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forumController");

// Jika pakai JWT, tambahkan middleware authenticate di sini
router.post("/create", forumController.createPost);
router.get("/", forumController.getAllPosts);

module.exports = router;
