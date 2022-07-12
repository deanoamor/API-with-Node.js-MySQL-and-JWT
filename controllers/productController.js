const {success , failed , notFound} = require('../helper/response-format');
const { Product }  = require('../models');

//for validation
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {
    getProduct: async (req, res) => {
        try{
            let id = req.query.id;
            if(id){
                let productid = await Product.findOne({
                    where: {
                        id: id
                    }
                });
                if(productid){
                    res.status(200).json(success('get product by id success', productid));
                }else{
                    res.status(404).json(notFound('product'));
                }

                return;
            }
            const product = await Product.findAll();
            res.status(200).send(success('get product success', product));
        }catch(err){
            res.status(500).send(failed('get product failed', err));
        }
    },

    createProduct: async (req, res) => {
        try{
            //initialize variable
            let name = req.body.name;
            let price = req.body.price;
            let productarray = [];

            //create schema for validation
            const schema = {
                name: {
                    type: "string",
                    min: 1,
                },
                price: {
                    type: 'number',
                }
            }
            
            //loop for insert variable to object and get validation, after that push to array
            for(let i = 0; i < name.length; i++){
                let obj = {
                    name: name[i],
                    price: parseInt(price[i])
                }

                //validation
                let validate = v.validate(obj, schema);
                if(validate.length > 0){
                    res.status(500).send(failed('validation failed', validate));
                    return;
                }

                //push to array if validation success
                productarray.push(obj);
            }

            //create product
            let product = await Product.bulkCreate(productarray);
            res.status(200).json(success('create product success', product));
        }catch(err){
            res.status(500).send(failed('create product failed', err));
            console.log(err);
        }
    },

    updateProduct: async (req, res) => {
        try{
            //initialize variable
            let id = req.body.id;

            //create schema for validation
            const schema = {
                name: {
                    type: "string",
                    min: 1,
                },
                price: {
                    type: 'number',
                }
            }

            //if id not found
            let cekid = await Product.findByPk(id);
            if(!cekid){
                res.status(404).json(notFound('product'));
                return;
            }

            //create object for update and validation
            let obj = {
                name: req.body.name,
                price: parseInt(req.body.price)
            }

            //validation
            let validate = v.validate(obj, schema);
            if(validate.length > 0){
                res.status(500).send(failed('validation failed', validate));
                return;
            }

            //update product
            await Product.update(obj,{
                where: {
                    id: id
                }
            });

            //show new product from update
            let product = await Product.findByPk(id);

            res.status(200).json(success('update product success', product));
        }catch(err){
            res.status(500).send(failed('update product failed', err));
        }
    },

    deleteProduct: async (req, res) => {
        try{
            let id = req.body.id;
            let cekid = await Product.findByPk(id);
            if(!cekid){
                res.status(404).json(notFound('product'));
                return;
            }

            await Product.destroy({
                where: {
                    id: id
                }
            });

            res.status(200).json(success('delete product success', cekid));
        }catch(err){
            res.status(500).send(failed('delete product failed', err));
        }
    }
}