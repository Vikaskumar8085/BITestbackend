const mongoose = require("mongoose");

const MemberSchema = mongoose.Schema(
  {
    group_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Member = mongoose.model("Member", MemberSchema);
module.exports = Member;
