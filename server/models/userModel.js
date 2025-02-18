const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:String,
    shippingaddress:String,
    apartment:String,
    mobileno:Number,
    pincode:String,
    district:String,
    state:String,
    useremail:String,
    password:String
})

module.exports = mongoose.model("user",userSchema);