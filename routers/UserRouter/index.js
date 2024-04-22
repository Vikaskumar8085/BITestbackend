const express = require("express");
const {
  RegisterCtr,
  LoginCtr,
  LogoutCtr,
  GetAllUserCtr,
  GetUsers,
  InvitationCtr,
} = require("../../controller/UserCtr");
const { CreateGroupCtr, Getgroup } = require("../../controller/GroupCtr");
const VerifyToken = require("../../Auth/Auth");
const {
  registervalidate,
  loginvalidate,
} = require("../../validation/userValidation");
const validator = require("express-joi-validation").createValidator({});
const userRouter = express.Router();

userRouter.post("/register", validator.body(registervalidate), RegisterCtr);
userRouter.post("/login", validator.body(loginvalidate), LoginCtr);
userRouter.post("/logout", LogoutCtr);
userRouter.get("/getuser", VerifyToken, GetUsers);
userRouter.get("/getall", VerifyToken, GetAllUserCtr);
userRouter.post("/invite", VerifyToken, InvitationCtr);

module.exports = userRouter;
