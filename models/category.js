'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.hasMany(models.Product)
    }
  }
  Category.init({
    name: DataTypes.STRING,
    shortDesc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};