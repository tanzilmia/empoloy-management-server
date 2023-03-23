const mongoose =  require("mongoose")
const userScema = new mongoose.Schema({
    name: String,
    email:String,
    password:String,
    role:String,
    Employid:Number
})

module.exports = userScema