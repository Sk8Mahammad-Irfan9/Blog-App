const { hashPassword, comparePassword } = require("../helper/authHelper");
const UserModel = require("../models/User");
const JWT = require("jsonwebtoken");

exports.userRegisterController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please fill all field",
      });
    }

    const exisitingUser = await UserModel.findOne({ email });

    if (exisitingUser) {
      return res.status(401).send({
        success: false,
        message: "user already exisits",
      });
    }

    const passwordHashed = await hashPassword(password);

    const user = await new UserModel({
      username,
      email,
      password: passwordHashed,
    }).save();

    res.status(200).send({
      success: true,
      message: "User Registered",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Unable to user register",
      error,
    });
  }
};

exports.userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "email not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Unable to login",
      error,
    });
  }
};
