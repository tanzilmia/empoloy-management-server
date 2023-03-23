const mongoose =  require("mongoose")
const castScema = new mongoose.Schema({
    reason:String,
    costAmount:Number,
    date:String,
    name:String,
    email:String,
})

module.exports = castScema