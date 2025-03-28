const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const Database = process.env.DATABASE_URL;
const adminRoute = require("./routes/adminRoute")
const userRoutes = require("./routes/userRoute")
const productRoutes = require("./routes/productRoute")
const paymentRoute = require("./routes/paymentRoute")

mongoose.connect(Database).then(()=>{
    console.log("Database Connected Successfull !!");
})

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use("/uploads",express.static("uploads"));

app.use("/admin",adminRoute);
app.use("/product",productRoutes);
app.use("/user",userRoutes);
app.use("/api/payment/",paymentRoute);

app.listen(PORT,()=>{
    console.log(`Server run on port ${PORT}`);
});