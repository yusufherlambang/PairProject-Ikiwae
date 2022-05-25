'use strict';
const {
  Model
} = require('sequelize');
const bcryptjs = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsTo(models.Profile)
      this.belongsToMany(models.Product, { through: 'Transaction' })
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate : (instance) => {
        instance.username = instance.username.toLowerCase()

        const salt = bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(instance.password, salt)

        instance.password = hash
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};