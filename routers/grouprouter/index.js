const express = require("express");
const {
  CreateGroupCtr,
  Getgroup,
  AddMembers,
  GetAllMemebers,
  RemoveGroups,
  removeMembers,
} = require("../../controller/GroupCtr");
const VerifyToken = require("../../Auth/Auth");
const { creategroupvalidate } = require("../../validation/groupvalidation");

const validateor = require("express-joi-validation").createValidator({});

const grouprouter = express.Router();

grouprouter.post(
  "/create-group",
  validateor.body(creategroupvalidate),
  VerifyToken,
  CreateGroupCtr
);
grouprouter.get("/get-groups", VerifyToken, Getgroup);
grouprouter.post("/addmemebers", VerifyToken, AddMembers);
grouprouter.get("/getallMembers/:id", VerifyToken, GetAllMemebers);
grouprouter.delete("/remove-group/:id", VerifyToken, RemoveGroups);

module.exports = grouprouter;
