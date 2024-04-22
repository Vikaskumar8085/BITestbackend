const jwt = require("jsonwebtoken");
require("dotenv").config();

const VerifyToken = async (req, res, next) => {
  try {
    const authtoken = await req.headers.authorization.replace(/^Bearer\s/, "");
    // console.log(authtoken);

    const decode = await jwt.verify(authtoken, process.env.JWT_SECRET);
    // console.log(decode.userId);

    req.user = decode.userId;
    next();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = VerifyToken;
