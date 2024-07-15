const mongoose=require("mongoose");
const UserVerificaitonSchema = new mongoose.Schema({
  userId: String, 
  uniqueString: String,
  createdAt: Date,
  expiresAt:Date 
});

const UserVerification=mongoose.model("user_verification",UserVerificaitonSchema);

module.exports=UserVerification;