const {success , failed , notFound} = require('../helper/response-format');
const { User } = require('../models');

//for validation
const Validator = require("fastest-validator");
const v = new Validator();

//auth config
const authConf = require('../config/auth.config');

//jwt
const jwt = require('jsonwebtoken');



module.exports = {
    getUser : async (req, res) => {
        try{
            let token = req.headers.authorization.split(' ')[1];
            let user = await User.findOne({
                where:{
                    email: jwt.verify(token, authConf.secret).data.email
                }
            })
    
            res.status(200).send(success('get user success', user));
        }catch(err){
            res.status(500).send(failed('get user failed', err));
        }
    },

    updateUser: async (req, res) => {
        try{
            //create schema for validation
            const schema = {
                name: { 
                    type: "string",
                    min: 1,
                }   
            }

            //token
            let token = req.headers.authorization.split(' ')[1];
            let user = await User.findOne({
                where:{
                    id: jwt.verify(token, authConf.secret).data.id
                }
            })

            //check if user not found
            if(!user){
                res.status(404).send(notFound('user not found'));
                return;
            }

            //create obj for validation
            let obj = {
                name: req.body.name
            }

            //validation
            let validate = v.validate(obj, schema);
            if(validate.length > 0){
                res.status(500).send(failed('validation failed', validate));
                return;
            }

            //update user
            await User.update(obj, {
                where: {
                    id: user.id
                }
            });

            //find data user that already update
            let usernew = await User.findOne({
                where:{
                    id: jwt.verify(token, authConf.secret).data.id
                }
            })

            res.status(200).send(success('update user success', usernew));
            
        }catch(err){
            res.status(500).send(failed('update user failed', err));
            console.log(err);
        }
    }
}