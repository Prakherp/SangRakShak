const mongoose = require('mongoose');
const {v4:uuidv4}=require("uuid");

const QASchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const SingleChatSchema = new mongoose.Schema({
  // chatId: { type: String, required: true, default: uuidv4 },
  chatName: { type: String, required: true },
  chatDetails: [QASchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const chatsSchema =  new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  chats: [SingleChatSchema]
});

SingleChatSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

chatsSchema.index({ userId: 1 });

const chatModel = mongoose.model("chats",chatsSchema);

module.exports = chatModel;