//express
const express = require('express');
const app = express();
const port = 3000;
const url = "/api";

//import route
const route = require('./routes/route');

//import multer
const multer = require('multer');
const upload = multer();

//multer to handle parsing data from form-data
app.use(upload.array());

//middleware if user forget to use /api
app.use((req, res, next) => {
    if(!req.url.includes('/api')){
        res.status(500).send({
            message: `do you mean http://localhost:3000${url}${req.url}?`
        })
    }else{
        next();
    }
});

//route for use route
app.use(url, route);

//midllware if route not found
app.use((req, res ) =>{
    const urlroute = req.url;
    res.status(404).
    send({
        status: '404',
        message: `url ${urlroute} not found`
    })
})

//listen
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});