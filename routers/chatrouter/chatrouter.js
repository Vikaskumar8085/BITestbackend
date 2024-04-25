const express = require("express");
const VerifyToken = require("../../Auth/Auth");
const Chat = require("../../models/ChatModel");

const chatrouter = express.Router();

chatrouter.use(VerifyToken);
// create a new chat
chatrouter.post("/create-new-chat", async (req, res) => {
  try {
    const newchat = new Chat(req.body);

    const savedchat = await newchat.save();

    await savedchat.populate("members");

    return res.status(200).json({
      message: "chat created successfully",
      data: savedchat,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

// get all chats of current user

chatrouter.get("/get-all-chats", async (req, res) => {
  try {
    const chat = await Chat.find({
      members: {
        $in: [req.user],
      },
    })
      .populate("members")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      message: "Chat fetched successfully",
      data: chat,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

// clear all unread message of a chat

chatrouter.post("/clear-unread-messages", async (req, res) => {
  try {
    const chat = await Chat.findById(req.body.chat);
    if (!chat) {
      return res.status(400).json({ message: "chat not found" });
    }

    const updatedChat = await Chat.findByIdAndUpdate(
      req.body.chat,
      {
        unreadMessages: 0,
      },
      { new: true }
    )
      .populate("members")
      .populate("lastMessage");

    await Message.updateMany(
      {
        chat: req.body.chat,
        read: false,
      },
      {
        read: true,
      }
    );

    return res.status(200).json({
      message: "Error clearing unread messages",
      data: updatedChat,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = chatrouter;
