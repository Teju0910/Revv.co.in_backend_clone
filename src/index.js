const express = require("express");
const fast2sms = require("fast-two-sms");

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


app.post("/sendmessage", (req, res) => {
  console.log(req.body.number);

  sendMessage(req.body.number,res)
})

function sendMessage(number,res) {

  let otp = "";
  for (var i = 0; i < 6; i++) {
    otp += (Math.floor(Math.random() * (10 - 0)) + 0).toString();
  }
  var optios = {
      authorization: "vjRICqdg1zNLkTS3pHiV8rmxD7ul6cPheM5fOA2s0EtU4oZyFw3K8DXbCmruOiknEvpTafUodHeyhVj9",
      message: `Your One Time Password for the Revv.in Car booking payment is ${otp}`,
      numbers: [number]
  };

  fast2sms.sendMessage(optios)
      .then((response) => {
          // console.log(response);
          res.send("OTP send Sucessfully to your mobile number");
      })
      .catch((error) => {
          // console.log(error);
          res.send("some error taken place")
      });
}

module.exports = app;
