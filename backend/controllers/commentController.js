const Comment = require("./../models/commentModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Post = require("../models/postModel");

const addComments = asyncHandler(async (req, res) => {
  const { userId, content, postId } = req.body;
  if (!userId || !content || !postId) {
    res.status(400);
    throw new Error("All fields must be provided");
  }

  const userExist = await User.findById(userId);
  const postExist = await Post.findById(postId);
  if (!userExist || !postExist) {
    res.status(400);
    throw new Error("user or post doesn't exist");
  }
  const newComment = await Comment.create({
    author: userId,
    content,
    post: postId,
  });
  res.status(200).json(newComment);
});

const getSinglePostComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  console.log(postId);
  if (!postId) {
    res.status(404);
    throw new Error("userId is not provided");
  }

  const postExist = await Post.findById({ _id: postId });
  if (!postExist) {
    res.status(404);
    throw new Error("user doesn't exist");
  }
  const comments = await Comment.find({ post: postId });
  if (!comments) {
    res.status(404);
    throw new Error("NO comments found");
  }
  res.status(200).json(comments);
});

module.exports = { addComments, getSinglePostComment };
