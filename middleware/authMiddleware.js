//import config
const authConf = require('../config/auth.config');

//import model user
const { User } = require('../models');

//import jwt token
const jwt = require('jsonwebtoken');


module.exports = {
    isLogin : async (req, res, next) => {
        let token;
        try{
            token = req.headers.authorization.split(' ')[1];
        }catch(err){
            res.status(403).send({
                status: 403,
                message: 'theres something wrong with your token / settings'
            })
            return;
        }

        if(!token){
            res.status(403).send({
                status: 403,
                message: 'token not found'
            })
            return;
        }

        jwt.verify(token, authConf.secret, (err, decoded) => {
            if(err){
                res.status(403).send({
                    status: 403,
                    message: 'unauthorized'
                })
                return;
            }
            req.decoded = decoded;
            next();
        })

    }
}