const express = require("express");
const userRouter = require("./UserRouter/index");
const grouprouter = require("./grouprouter");

const router = express.Router();

router.use("/user", userRouter);
router.use("/group", grouprouter);

module.exports = router;
