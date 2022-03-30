const express = require("express");
const router = express.Router();
const crudController = require("./crud.controller");
const Car_Location = require("../models/car_location.model");

router.get("/", async (req, res) => {
  try {
    const data = await Car_Location.find().populate().lean().exec();
    return res.status(200).send({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});
router.get("/:locationId", async (req, res) => {
  try {
    const data = await Car_Location.find({location:req.params.locationId}).populate('car').populate('location').lean().exec();
    return res.status(200).send({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.post("/", crudController.addOne(Car_Location));

router.patch("/:id", crudController.updateById(Car_Location));

router.delete("/:id", crudController.deleteById(Car_Location));

module.exports = router;
