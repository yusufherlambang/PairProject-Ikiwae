'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsToMany(models.User, { through: 'Transaction' })
      this.belongsTo(models.Category)
    }
  }
  Product.init({
    name: DataTypes.STRING,
    longDesc: DataTypes.TEXT,
    shortDesc: DataTypes.STRING,
    img: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};