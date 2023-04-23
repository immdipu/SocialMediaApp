const express = require("express");
const {
  createPost,
  removePost,
  SingleUserAllPost,
} = require("./../controllers/PostController");

const router = express.Router();

router.get("/:Id", SingleUserAllPost);
router.post("/newpost", createPost);
router.put("/removepost", removePost);

module.exports = router;
