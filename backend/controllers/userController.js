const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const jwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

const signUp = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword, image } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    res.status(400);
    throw new Error("Please Enter all the fields");
  }

  if (password.trim() !== confirmPassword.trim()) {
    res.status(400);
    throw new Error("Password didn't match");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const newUser = await User.create({
    name,
    email,
    password,
    image,
  });

  if (newUser) {
    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      image: newUser.image,
      token: jwtToken(newUser._id),
    });
  }
});

const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("please provide all the fields");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User doesn't exist");
  }
  if (password !== user.password) {
    res.status(400);
    throw new Error("email or password is wrong");
  }
  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    image: user.image,
    token: jwtToken(user._id),
  });
});

module.exports = { signUp, logIn };
