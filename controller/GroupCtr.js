const AsyncHandler = require("express-async-handler");
const Group = require("../models/GroupModel");
const Member = require("../models/GroupMemeber");
const User = require("../models/UserModel");

// Create Groups

const CreateGroupCtr = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(400);
      throw new Error("User not found, please signup");
    }
    const creategroup = await Group(req.body);
    await creategroup.save();
    return res.status(201).json("group created");
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// Create Groups

// GetGroups
const Getgroup = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(400);
      throw new Error("User not found, please signup");
    }
    const getgroup = await Group.find({
      creator_id: req.user,
    }).sort({ createdAt: -1 });
    if (getgroup) {
      return res.status(200).json(getgroup);
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// GetGroups

// delete groups
const RemoveGroups = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(400);
      throw new Error("User not found, please signup");
    }
    const removegroups = await Group.findByIdAndDelete({ _id: req.params.id });
    console.log(req.params.id, "id?????");

    if (removegroups) {
      const removeMembers = await Member.findOne({
        group_id: req.params.id,
      });
      console.log(removeMembers);
      await Member.findByIdAndDelete({ _id: removeMembers._id });
      // console.log(removeMembers);
    }
    return res.status(200).json("group has been deleted");
  } catch (error) {
    throw new Error(error.message);
  }
});

// delete groups

// Add memebers

const AddMembers = AsyncHandler(async (req, res) => {
  const { groupId, memberIds } = req.body;
  try {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(400);
      throw new Error("User not found, please signup");
    }

    let meme = await memberIds.map((id) => {
      return id;
    });

    const addmemebers = await Member({
      group_id: groupId,
      members: meme,
    });
    // save members
    await addmemebers.save();

    return res.status(200).json("Successfully Add Members");
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// add memebers

// getall memebers

const GetAllMemebers = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(400);
      throw new Error("User not found, please signup");
    }
    const CheckMember = await Member.findOne({ group_id: req.params.id });

    if (!CheckMember) {
      res.status(400);
      throw new Error("Invalid Groups");
    }

    const getmemeber = await CheckMember;

    const getallmembers = await Promise.all(
      getmemeber.members.map(async (items) => {
        return await User.findById({ _id: items });
      })
    );

    return res.status(200).json(getallmembers);
  } catch (error) {
    throw new Error(error.message);
  }
});

// get all memebers

// delete Members

module.exports = {
  Getgroup,
  AddMembers,
  GetAllMemebers,
  CreateGroupCtr,
  RemoveGroups,
};
