const express = require("express");

const userController = require("./controllers/user.controller")
const passport = require("./configs/google-oauth")

const {register,login, generateToken} = require("./controllers/auth.controller")

const app = express();
app.use(express.json());

app.use("/user", userController)
app.post("/register",register)
app.post("/login", login)


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));
 
app.get(
'/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session:false } ),

  function(req, res) {
    const token = generateToken(req.user)
    return res.status(200).send({user:req.user, token})
  }
)


module.exports = app;
