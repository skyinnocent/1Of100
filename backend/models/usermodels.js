const mongoose = require("mongoose");

const userScheema = new mongoose.Schema(
  {
    name: {
      type: String,
      requireed: true,
    },
    email: {
      type: String,
      unique: true,
      requireed: true,
    },
    age: {
      type: Number,
    },
  },
  { timestamps: true }
);

//create model
const User = mongoose.model("User", userScheema);
module.exports = User;
