//middleware
const mid = require('./middleware/main');

//express
const express = require('express');
const app = express();
const port = 3000;
const url = "/api";

//import route
const productRoute = require('./routes/productRoute');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');

//import multer
const multer = require('multer');
const upload = multer();

//multer to handle parsing data from form-data
app.use(upload.array());

//middleware if user forget to use /api
app.use(mid.routeMiddleware.apiRouteCheck);


//route for use route
//auth route
app.use(url, authRoute);

//user route
app.use(url, [mid.authMiddleware.isLogin, mid.authMiddleware.isTokenExists], userRoute);

//product route
app.use(url, [mid.authMiddleware.isLogin, mid.authMiddleware.isTokenExists] ,productRoute);


//midllware if route not found
app.use(mid.routeMiddleware.notfoundRouteCheck);

//listen
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});