const express = require("express");
const adminRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userscema = require("../Scema/users");
const { default: mongoose } = require("mongoose");
const User = new mongoose.model("User", userscema);
const castScema = require("../Scema/cast");
const Cast = new mongoose.model("Cast", castScema);

// post expenss


adminRoute.get("/all-user", async(req,res)=>{
    try{
        const data = await User.find({})
        res.send({message:"success", data : data})
    }catch(e){}
})




adminRoute.get("/user-info/:id", async(req,res)=>{
    try{
        const id = req.params.id;
        const user = await User.findOne({_id:id})
        const data =  await Cast.find({email:user.email})
        res.send(data)
    }catch(e){}
})


// get edetable data

adminRoute.get("/edete-post/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const mypost = await Cast.findOne({ _id: id });
      res.send({ message: "success", posts: mypost });
    } catch (e) {
      res.send({ message: "data not found" });
    }
  });


//   delete hitry 


adminRoute.delete("/delete-cast", async (req, res) => {
    try {
      const result = await Cast.deleteOne({ _id: req.query.id });
      if (result.deletedCount === 1) {
        res.send({message:"success"});
      } else {
        res.send({ message: "Not Success" });
      }
    } catch (err) {
      res.send({ message: "Error occurred while deleting user history" });
    }
  });





//   edete Cast History

adminRoute.put("/edite-post", async (req, res) => {
    try {
      const edetedInfo = req.body;
      const {_id, reason, EdetedcostAmount} = edetedInfo
      
      
      await Cast.updateOne(
        { _id: _id },
        {
          $set: {
            reason:reason,
            costAmount:EdetedcostAmount
          },
        }
      );
      res.send({message:"Update Complete"});
    } catch (e) {
      res.send({ message: e.message });
    }
  });
  


module.exports = adminRoute;
