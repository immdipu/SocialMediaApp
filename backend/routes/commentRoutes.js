const express = require("express");
const {
  addComments,
  getSinglePostComment,
} = require("../controllers/commentController");

const router = express.Router();

router.post("/", addComments);
router.get("/:postId", getSinglePostComment);

module.exports = router;
