const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport")
const { v4: uuidv4 } = require('uuid');

const User = require("../models/user.models")

require("dotenv").config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5656/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {

   console.log("profile",profile)
    let user = await User.findOne({email : profile?._json?.email}).lean().exec()

    if(!user){
        user = await User.create({
            name : profile._json.given_name,        
            email : profile._json.email,
            picture : fs.readFileSync(profile._json.picture) ,
            password : uuidv4(), 
            role : ["customer"]
        })
    }
    console.log(user)
    return cb(null, user);
  }
));

module.exports = passport;