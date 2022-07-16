//import from productController
const userController = require('../controllers/userController');

//express
const express = require('express');
const route = express.Router();

//route auth user
route.get("/user/get", userController.getUser);
route.post("/user/update", userController.updateUser);


module.exports = route;