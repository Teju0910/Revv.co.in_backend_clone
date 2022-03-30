const express = require("express");
const router = express.Router();
const crudController = require("./crud.controller");
const Car_Location = require("../models/car_location.model");
const CarModel = require("../models/carModel.model");

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
    let registeredCars = await Car_Location.find().populate("car");

    let modelsAvailiabe = {};

    registeredCars.forEach((ele) => {
      if (ele.car.isBooked) {
        if (modelsAvailiabe[ele.car.model]) {
          modelsAvailiabe[ele.car.model]--;
        } else {
          modelsAvailiabe[ele.car.model] = 0;
        }
      } else {
        if (modelsAvailiabe[ele.car.model]) {
          modelsAvailiabe[ele.car.model]++;
        } else {
          modelsAvailiabe[ele.car.model] = 1;
        }
      }
    });
    let availiabe = [];
    let soldout = [];

    for (key in modelsAvailiabe) {
      if (modelsAvailiabe[key] > 0) {
        availiabe.push(await CarModel.find({ _id: key }));
      } else {
        soldout.push(await CarModel.find({ _id: key }));
      }
    }
    return res.status(200).send({ availiabe, soldout });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

router.post("/", crudController.addOne(Car_Location));

router.patch("/:id", crudController.updateById(Car_Location));

router.delete("/:id", crudController.deleteById(Car_Location));

module.exports = router;
