const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
const authRoutes = require("./router/authRoutes");
const postRoutes = require("./router/postRoutes");

app.use(express.json());
app.use(cors());
PORT = process.env.PORT || 5000;

connectDB();

app.use("/api/auth", authRoutes);

app.use("/api/blog", postRoutes);

app.get("/", (req, res) => {
  res.send("hello here");
});

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
