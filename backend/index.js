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

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,PUT,PUSH,POST,DELETE",
  credentials: true
}));
app.use(BodyParser.json());

app.use(session({
  secret:"This is a secret!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user,done)=>{
  done(null,user);
});

passport.deserializeUser((user,done)=>{
  done(null,user);
});

// passport.serializeUser(function(user, cb) {
//   process.nextTick(function() {
//     return cb(null, {
//       id: user.id,
//       username: user.username,
//       picture: user.picture
//     });
//   });
// });

// passport.deserializeUser(function(user, cb) {
//   process.nextTick(function() {
//     return cb(null, user);
//   });
// });

//passport.use(User.createStrategy());

passport.use(new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    console.log("email->",email);
    console.log("password->",password);
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
  callbackURL: "http://localhost:5050/auth/google/sangrakshak"
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
  passport.authenticate('google', { scope: ['profile','email'],failureRedirect: 'http://localhost:3000/signin' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/app');
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



app.listen(5050, ()=>{
  console.log("Server is running on Port: 5050")
});
