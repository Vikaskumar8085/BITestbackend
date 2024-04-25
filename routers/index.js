const express = require("express");
const userRouter = require("./UserRouter/index");
const grouprouter = require("./grouprouter");
const msgrouter = require("./MessageRouter/msgrouter");
const chatrouter = require("./chatrouter/chatrouter");

const router = express.Router();

router.use("/user", userRouter);
router.use("/group", grouprouter);
router.use("/msg", msgrouter);
router.use("/chat", chatrouter);

module.exports = router;
