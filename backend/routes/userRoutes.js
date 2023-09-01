// dependencies

const User = require("../models/usermodels");
const express = require("express");
const router = express.Router();

// routes

router.post("/", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const userData = await User.create({
      name: name,
      email: email,
      age: age,
    });
    res.status(201).json(userData);
  } catch (error) {
    res.status(400).json({
      massage: "Their was an error",
    });
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const getAllUser = await User.find();
    res.status(200).json(getAllUser);
  } catch (error) {
    res.status(400).json({
      massage: "Their was an error fetching the request user",
    });
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getOneUser = await User.findById({ _id: id });
    res.status(200).json(getOneUser);
  } catch (error) {
    res.status(400).json({
      massage: "Their was an error fetching the requested user",
    });
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteUser);
  } catch (error) {
    res.status(400).json({
      massage: "Their was an error deleting",
    });
    console.log(error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  //   const { name, email, age } = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updateUser);
  } catch (error) {
    res.status(400).json({
      massage: "Their was an error updating",
    });
    console.log(error);
  }
});

module.exports = router;
