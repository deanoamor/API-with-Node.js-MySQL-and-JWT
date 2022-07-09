//import from productController
const productController = require('../controllers/productController');

//express
const express = require('express');
const route = express.Router();

//route product
route.get("/product/get", productController.getProduct);
route.post("/product/create", productController.createProduct);
route.put("/product/update", productController.updateProduct);
route.delete("/product/delete", productController.deleteProduct);

module.exports = route;