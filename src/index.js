const express = require("express");

const userController = require("./controllers/user.controller")
// const passport = require("./configs/google-oauth")

// const {register,login, generateToken} = require("./controllers/auth.controller")

const app = express();
app.use(express.json());

// app.use("/user", userController)
// app.post("/register",register)
// app.post("/login", login)


// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] }));
 
// app.get(
// '/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login', session:false } ),

//   function(req, res) {
//     const token = generateToken(req.user)
//     return res.status(200).send({user:req.user, token})
//   }
// )


const carModelController = require("./controllers/carModel.controller");
const carController = require("./controllers/car.controller");
const locationController = require("./controllers/location.controller");
// const carLocationController = require("./controllers/car_location.controller");
const queryController = require('./controllers/query.controller');
app.use("/car-models", carModelController);
app.use("/cars", carController);
app.use("/locations", locationController);
// app.use("/car-locations", carLocationController);
app.use("/q",queryController);
module.exports = app;
