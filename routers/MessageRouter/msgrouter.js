const express = require("express");
const VerifyToken = require("../../Auth/Auth");
const Message = require("../../models/MessageModel");
const Chat = require("../../models/ChatModel");

const msgrouter = express.Router();

// new message

msgrouter.post("/new-message", async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();

    await Chat.findOneAndUpdate(
      { _id: req.body.chat },
      {
        lastMessage: savedMessage._id,
        $inc: { unreadMessages: 1 },
      }
    );

    return res.status(200).json({
      message: "Message sent successfully",
      data: savedMessage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Message error ",
      error: error.message,
    });
  }
});

// get all message of a chat
msgrouter.get("/get-all-messages/:chatId", async (req, res) => {
  try {
    const message = await Message.find({
      chat: req.params.chatId,
    }).sort({
      createdAt: 1,
    });

    return res.status(200).json({
      message: "Messages fetched successfully",
      data: message,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});
module.exports = msgrouter;

// new-message
// get-all-messages/:chatId
// "/get-all-chats"
// "/clear-unread-messages"
// "/clear-unread-messages"
