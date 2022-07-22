'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    //define all associations/relation here
    static associate(models) {

      //Product belongs to with User
      Product.belongsTo(models.User, {
        foreignKey: 'users_id',
      });

    }
  }
  Product.init({
    name: DataTypes.STRING,
    users_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};