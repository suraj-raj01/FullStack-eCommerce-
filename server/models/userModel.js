const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:String,
    useremail:String,
    mobileno:Number,
    password:"String"
})

module.exports = mongoose.model("user",userSchema);