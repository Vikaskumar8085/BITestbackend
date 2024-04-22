const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema(
  {
    creator_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    groupName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model("Group", GroupSchema);
module.exports = Group;
