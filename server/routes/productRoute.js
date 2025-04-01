const express = require("express");
const route = express.Router();
const productController = require("../controllers/productController");

route.post("/showrelatedproduct",productController.showRelatedProduct)
route.post("/filterproduct",productController.FilterProduct)

module.exports = route;