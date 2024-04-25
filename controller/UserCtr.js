const AsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

// Register Controller
const RegisterCtr = AsyncHandler(async (req, res) => {
  try {
    const exists = await User.findOne({ email: req.body.email });
    if (exists) {
      res.status(400);
      throw new Error("Email Address Already Exists");
    }
    const gen = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, gen);
    req.body.password = hashpassword;
    const resp = await User(req.body);
    await resp.save();
    return res.status(200).json(resp);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// Login Controller
const LoginCtr = AsyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401);
      throw new Error("unAuthorized User");
    }

    console.log(user, "suels");
    // check if password is correct

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    console.log(validPassword);
    if (!validPassword) {
      res.status(400);
      throw new Error("please Enter valid email and Password");
    }

    // get Token

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    if (!token) {
      res.status(400);
      throw new Error("token is not generated");
    }
    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// Logout Controller

const LogoutCtr = AsyncHandler(async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

const GetUsers = AsyncHandler(async (req, res) => {
  try {
    const getuser = await User.findById(req.user);
    if (!getuser) {
      res.status(400);
      throw new Error("User not exists");
    }
    return res.status(200).json(getuser);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
// getall users

const GetAllUserCtr = AsyncHandler(async (req, res) => {
  try {
    // const user = await User.findById(req.user);
    // if (!user) {
    //   res.status(400);
    //   throw new Error("User not found, please signup");
    // }
    const users = await User.find().sort({ createdAt: -1 }).lean().exec();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// send invitation mail

const InvitationCtr = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(400);
      throw new Error("User not found, please signup");
    }
    const exists = await User.findOne({ email: req.body.email });
    if (exists) {
      res.status(400);
      throw new Error("User Already Exists");
    }

    // //
    const resetUrl = `${process.env.FRONTEND_URL}`;

    // Reset Email
    const message = `
        <h2>Hello Sir</h2>
        <p>Join our group! Exciting discussions and opportunities await. Click to connect now!</p>
        <p>This reset link is valid for only 30minutes.</p>

        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

        <p> Warm Regards...</p>
        <p>Brain Inventry Team</p>
      `;
    const subject = "Invitation Mail";
    const send_to = req.body.email;
    const sent_from = process.env.EMAIL_USER;

    await sendEmail(subject, message, send_to, sent_from);

    return res.status(200).json("Email Sent");
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = {
  RegisterCtr,
  LoginCtr,
  LogoutCtr,
  GetUsers,
  InvitationCtr,
  GetAllUserCtr,
};
