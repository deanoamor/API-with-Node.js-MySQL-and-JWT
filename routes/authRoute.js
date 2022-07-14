//import from productController
const authController = require('../controllers/authController');

//express
const express = require('express');
const route = express.Router();

//route auth user
route.post("/auth/register", authController.register);
route.post("/auth/login", authController.login);

module.exports = route;