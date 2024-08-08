const express=require("express");
const mongoose = require("mongoose");
const cors=require("cors");
const BodyParser=require("body-parser");
require("dotenv").config();
require("./Model/db");
const ModelRouter = require("./Router/Routes");
const passport = require("passport"); //level-5
const session = require("express-session");
const passportlocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User=require( './Model/UserModel');
const bcrypt = require("bcryptjs");
const UserChatModel = require('./Model/chatModel');

const app = express();

app.use(cors({
  origin: process.env.FRONT_URL,
  methods: "GET,PUT,PUSH,POST,DELETE",
  credentials: true
}));
app.set("trust proxy",1);
app.use(BodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 604800000, //one week(1000*60*60*24*7)
   sameSite: "none",
   secure : true
  }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id); // Serialize user by ID
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Find user by ID
    done(null, user);
  } catch (err) {
    done(err);
  }
});


passport.use(new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      else if (!user.verified){
        return done(null, false, { message: 'Please verify through email.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: (process.env.AUTH_GOOGLE_LINK+"/sangrakshak")
},
async function(accessToken, refreshToken, profile, done) {
  try{
    let user = await User.findOne({email: profile.emails[0].value});

    if(!user){
      user = new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        username: profile.displayName
      });

      await user.save();
    }
    else{
      user = await User.findOneAndUpdate({email: profile.emails[0].value},{$set: {googleId: profile.id}});
    }
    return done(null,user);
  }catch(error){
    done(error,null);
  }
}
));


app.get("/",function(req,res){
  res.send("Hi, from the server. It's running.");
});

app.use("/tasks",ModelRouter);


app.get('/auth/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true });
  } else {
    res.json({ authenticated: false });
  }
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] })
);
 
app.get('/auth/google/sangrakshak', 
  passport.authenticate('google', { scope: ['profile','email'],failureRedirect: (process.env.FRONT_URL+'/signin') }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(process.env.FRONT_URL+'/app');
  }
);

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        message: info.message || 'Login failed'
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        message: 'The user has logged in successfully.',
        success: true
      });
    });
  })(req, res, next);
});


app.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.status(200).json({
      success: true
    });
  });
});

app.get("/checkuser",(req,res)=>{
  res.send("Hi");
});


app.get("/getchatnamesandid", async(req,res)=>{
  if(req.isAuthenticated()){
    const UserChats = await UserChatModel.findOne({userId: req.user._id},{'chats.chatName': 1, 'chats._id': 1});
    if(UserChats && UserChats.chats){
      res.status(200).json({
        chats: UserChats.chats,
        success: true,
      });
    }
  }
  else{
    res.status(200).json({
      success: false
    });
  }
})

app.listen(5050, ()=>{
  console.log("Server is running on Port:" + (process.env.PORT || 5050));
});
