const {success , failed , notFound} = require('../helper/response-format');
const { User } = require('../models');
const { Token } = require('../models');
const authConf = require('../config/auth.config');

//for validation
const Validator = require("fastest-validator");
const v = new Validator();

//hash password
const passwordHash = require('password-hash');

//jwt
const jwt = require('jsonwebtoken');

module.exports = {
    register : async (req, res) => {
        try{
            //create schema for validation
            const schema = {
                name: {
                    type: "string",
                    min: 1,
                },
                email: {    
                    type: "email",
                    min: 1,
                },
                password: {
                    type: "string",
                    min: 1,
                }
            }

            //create object for validation
            let obj = {
                name: req.body.name,
                email: req.body.email,
                password: passwordHash.generate(req.body.password),
            }

            //validation
            let validate = v.validate(obj, schema);
            if(validate.length > 0){
                res.status(500).send(failed('validation failed', validate));
                return;
            }

            //register user
            let register = await User.create(obj);

            res.status(200).json(success('register success', register));
        }catch(err){
            res.status(500).send(failed('register failed', err));
        }
    },

    login : async (req, res) => {
        try{
            let email = req.body.email;
            let password = req.body.password;

            let user = await User.findOne({
                where: {
                    email: email
                }
            });

            if(!user){
                res.status(404).send(notFound('user'));
                return;
            }
            if(!passwordHash.verify(password , user.password)){
                res.status(500).send(failed('invalid password', 'password'));
                return;
            }

            let token = jwt.sign({
                id : user.id,
            } , authConf.secret);

            await Token.create({
                token: token,
            })

            res.status(200).json(success('login success', token));

        }catch(err){
            res.status(500).send(failed('login failed', err));
        }
    }
}