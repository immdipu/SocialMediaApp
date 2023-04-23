const Post = require("./../models/postModel");
const asyncHandler = require("express-async-handler");
const User = require("./../models/userModel");

const createPost = asyncHandler(async (req, res) => {
  const { author, content, image } = req.body;
  if (!author) {
    res.status(400);
    throw new Error("author id is needed");
  }
  if (!content && !image) {
    res.status(400);
    throw new Error("content or image can't be empty");
  }
  const user = await User.findById(author);
  if (!user) {
    res.status(400);
    throw new Error("No user is found of given Id");
  }
  const newPost = await Post.create({
    author,
    content,
    image,
  });

  if (!newPost) {
    res.status(400);
    throw new Error("Failed to create a new post");
  }

  res.status(200).json({
    id: newPost._id,
    content: newPost.content,
    image: newPost.image,
    createdAt: newPost.createdAt,
  });
});

const removePost = asyncHandler(async (req, res) => {
  const { postId, userId } = req.body;
  if (!postId || !userId) {
    res.status(400);
    throw new Error("PostId or UserId is missing");
  }
  try {
    await Post.findOneAndDelete({ _id: postId, author: userId });
    res.status(200).json("success");
  } catch (error) {
    res.status(400);
    throw new Error("post is not found");
  }
});

const SingleUserAllPost = asyncHandler(async (req, res) => {
  const { Id } = req.params;
  if (!Id) {
    res.send(400);
    throw new Error("No userId is provided");
  }
  try {
    const posts = await Post.find({ author: Id }).select(
      "_id author content createdAt"
    );
    res.status(200).json(posts);
  } catch (error) {
    res.status(400);
    throw new Error("No posts found");
  }
});

module.exports = { createPost, removePost, SingleUserAllPost };
