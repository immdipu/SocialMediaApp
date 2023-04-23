const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
