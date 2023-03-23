const express = require("express");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userscema = require("../Scema/users");
const { default: mongoose } = require("mongoose");
const User = new mongoose.model("User", userscema);
const castScema = require("../Scema/cast");
const Cast = new mongoose.model("Cast", castScema);

// post expenss

userRoute.post("/add-cast", async (req, res) => {
    try {
        const addCast = req.body;
        const alreadyExist = await Cast.findOne({
          date: addCast.date,
          reason: addCast.reason,
          costAmount: addCast.costAmount,
          email: addCast.email,
        });
        if (alreadyExist) {
          res.send({ message: "Post is Alrady Exist" });
        } else {
          const NewPost = new Cast(addCast);
          await NewPost.save();
          res.send({ message: "Post created successfully" });
        }
      } catch (e) {
        res.send({ message: "Server Side Error" });
      }
});


userRoute.get("/my-history", async (req, res) => {
    try {
      const email = req.query.email;
      const myHistory = await Cast.find({ email: email }).sort({ date: -1 });
      res.send({ message: "success", data: myHistory });
    } catch (e) {
      res.send({ message: "Server Side Error" });
    }
  });
  


module.exports = userRoute;
