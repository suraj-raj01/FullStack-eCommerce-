const express = require("express");
const route = express.Router();
const userController = require("../controllers/userController");

route.post("/userregister",userController.registration)
route.post("/userlogin",userController.userLogin)
route.post("/profile",userController.userProfile)
route.post("/userprofileshow",userController.userProfileShow)
route.get("/customerrecords",userController.customerRecords)
route.post("/purchaseditems",userController.purchasedItems)
route.post("/itemreceived",userController.itemReceived)

module.exports = route;