const express = require("express");
const route = express.Router();
const userController = require("../controllers/userController");

route.post("/registration",userController.Registration)

module.exports = route;