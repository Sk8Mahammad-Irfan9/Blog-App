const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_CONNECT);
    console.log("Mongo db connected");
  } catch (err) {
    console.log("DB disconnected", err);
  }
};

module.exports = connectDB;
