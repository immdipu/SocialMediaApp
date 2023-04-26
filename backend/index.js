const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoute");
const postRoutes = require("./routes/postRoutes");
const commnetRoutes = require("./routes/commentRoutes");
const { errorHandler } = require("./utils/errorHandle");
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commnetRoutes);

app.use(errorHandler);

let port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Database connected successfully");
  app.listen(port, () => {
    console.log("Server is running on", port);
  });
});
