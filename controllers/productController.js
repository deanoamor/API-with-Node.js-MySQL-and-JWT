const {success , failed , notFound} = require('../helper/response-format');
const { Product }  = require('../models');

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
            let name = req.body.name;
            let price = req.body.price;
            let productarray = [];
            for(let i = 0; i < name.length; i++){
                let obj = {
                    name: name[i],
                    price: price[i]
                }
                productarray.push(obj);
            }
            let product = await Product.bulkCreate(productarray);
            res.status(200).json(success('create product success', product));
        }catch(err){
            res.status(500).send(failed('create product failed', err));
        }
    },

    updateProduct: async (req, res) => {
        try{
            let id = req.body.id;
            let cekid = await Product.findByPk(id);
            if(!cekid){
                res.status(404).json(notFound('product'));
                return;
            }

            await Product.update({
                name: req.body.name,
                price: req.body.price
            },{
                where: {
                    id: id
                }
            });

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