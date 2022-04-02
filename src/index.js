const express = require("express");

const userController = require("./controllers/user.controller")
const passport = require("./configs/google-oauth")
const { body} = require("express-validator");
const {register,login, generateToken} = require("./controllers/auth.controller")
const User = require("./models/user.models")
const app = express();
app.use(express.json());

app.use("/user", userController);

app.post("/register",
body("name")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("First Name cannot be empty")
    .isLength({ min: 4 })
    .withMessage("First Name must be at least 4 characters"),
  
  body("email")
    .isEmail()
    .custom(async (value) => {
      console.log(value)
      const user = await User.findOne({ email: value });
 
      if (user) {
        throw new Error("Email is already taken");
      }
      return true;
    }),

  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .custom((value) => {
      const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;
      if (!value.match(passw)) {
        throw new Error("Password must be strong");
      }
      return true;
    }),
  body("mobileNumber").custom((value) => {
    if (value && value.length != 10 ) {
      throw new Error("Mobile Number must be 10 digits");
    }
    return true;
  })

,register)
app.post("/login",

login)


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));
 
app.get(
'/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session:false } ),

  function(req, res) {
    const token = generateToken(req.user)
    //res.redirect('https://revv-clone-project.netlify.app/')
 
   return res.status(200).send({user:req.user, token})
  //  .redirect('https://revv-clone-project.netlify.app/')
  },
   
)


module.exports = app;
