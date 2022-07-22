const {success , failed , notFound} = require('../helper/response-format');
const { User } = require('../models');
const { Token } = require('../models');
const { Product } = require('../models');

//for validation
const Validator = require("fastest-validator");
const v = new Validator();


module.exports = {
    getUser : async (req, res) => {
        try{
            // let token = req.headers.authorization.split(' ')[1];
            let user = await User.findOne({
                where:{
                    id: idUser
                },
                include: {
                    model: Product,
                }
            })
    
            res.status(200).send(success('get user success', user));
        }catch(err){
            res.status(500).send(failed('get user failed', err));
            console.log(err)
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
            let user = await User.findOne({
                where:{
                    id: idUser
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
                    id: idUser
                }
            });

            //find data user that already update
            let usernew = await User.findOne({
                where:{
                    id: idUser
                }
            })

            res.status(200).send(success('update user success', usernew));
            
        }catch(err){
            res.status(500).send(failed('update user failed', err));
            console.log(err);
        }
    },

    logoutUser: async (req, res) => {
        try{
            let token = req.headers.authorization.split(' ')[1];
            await Token.destroy({
                where: {
                    token: token
                }
            })
            res.status(200).send(success('logout success , token deleted', token));
        }catch(err){
            res.status(500).send(failed('logout failed', err));
        }
    }
}