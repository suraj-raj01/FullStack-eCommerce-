const express = require("express");
const route = express.Router();
const userController = require("../controllers/userController");

route.post("/userregister",userController.registration)
route.post("/userlogin",userController.userLogin)
route.post("/profile",userController.userProfile)
route.post("/userprofileshow",userController.userProfileShow)

module.exports = route;