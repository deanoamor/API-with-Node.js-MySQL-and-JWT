'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    //define all associations/relation here
    static associate(models) {

      //User one to many with Product
      User.hasMany(models.Product, {
        foreignKey: 'users_id',
      });

    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};