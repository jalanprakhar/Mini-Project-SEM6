require("dotenv").config();
const mongoose = require("mongoose");
console.log(process.env.USER);
console.log(process.env.PASSWORD);
const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.22yof.mongodb.net/`;

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
