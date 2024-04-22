const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: ["please enter your name", true],
    },
    email: {
      type: String,
      required: ["please enter your email", true],
    },
    phone: {
      type: String,
      required: ["please enter your phone no", true],
    },
    password: {
      type: String,
      required: ["please enter your password", true],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
