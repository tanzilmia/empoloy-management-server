const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
const authentication = require('./Routes/authentication')
const userRoute = require('./Routes/userRoute')
const adminRoute = require('./Routes/adminRoutes')

// middleware
app.use(cors());
app.use(express.json());

const mongoUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nz3kcdw.mongodb.net/EmployApp?retryWrites=true&w=majority`;
// conncet with mongodb
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then(() => {
    console.log("connceted mongoose");
  })
  .catch((e) => console.log(e));

// user authentication 

app.use("/auth", authentication)
app.use("/user", userRoute)
app.use("/admin", adminRoute)

// testing
app.get("/", (req, res) => {
  res.send("Employ  Website is running");
});
app.listen(port, () => {
  console.log(`Employ Website on port ${port}`);
});