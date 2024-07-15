const mongoose = require("mongoose");

const UserSchema= mongoose.Schema({
  username: String,
  email: String,
  password: String,
  googleId: String,
  verified: Boolean
});


const User= mongoose.model('users',UserSchema);

module.exports= User;