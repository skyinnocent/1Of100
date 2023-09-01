const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
app.use(cors());
app.use(express.json());
const userRoute = require("../backend/routes/userRoutes");

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("DB connected succesfully");
    app.listen(+process.env.PORT, (error) => {
      if (error) console.log(error);
      console.log("server started successfully");
    });
  })
  .catch((error) => {
    console.log("error", error);
  });

app.use(userRoute);
