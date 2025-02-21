const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
    name:String,
    amount:Number,
    mobileno:Number,
    useremail:String,
    defaultImg:String,  
    shippingaddress:String,
    productname:String,
    date:{
    type:Date,
    status:{
        type:String,
        default:"normal"
    },
    default:Date.now
    },
    userid:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
  }
})

module.exports = mongoose.model("customer",customerSchema);