const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
const carLocationSchema = new mongoose.Schema({
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "location",
    required: true,
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "car",
    required: true,
  },
},{
    timestamps:true
});

module.exports = mongoose.model('car_location',carLocationSchema);