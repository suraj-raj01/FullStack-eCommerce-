const express = require("express");
const route = express.Router();
const productController = require("../controllers/productController");

route.post("/showrelatedproduct",productController.showRelatedProduct)
route.post("/filterproduct",productController.FilterProduct)
route.post("/filterbyname",productController.FilterProductByName)
route.post("/filterbycategory",productController.FilterProductByCategory)

module.exports = route;