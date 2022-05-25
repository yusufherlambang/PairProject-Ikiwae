'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      this.hasOne(models.User)
    }
  }
  Profile.init({
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Masukan dengan format email yang benar"
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        isGreaterThanOtherField(value) {
          if (value.length > 16 && value.length < 10 && !isNaN(value)) {
            throw new Error('Nomor handphone yang anda masukan salah');
          }
        }
      }
    },
    address: { type: DataTypes.TEXT },
    isAdmin: DataTypes.BOOLEAN,
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['male', 'female']],
          msg: "Harus antara pria dan wanita"
        }
      }
    },
    age: DataTypes.INTEGER,
    birthDate: { type: DataTypes.DATE },
    photo: DataTypes.STRING
  }, {
    hooks : {
      beforeCreate : (instance) => {
          instance.isAdmin = false

          const yearNow = new Date()

          instance.age = yearNow.getFullYear() - instance.birthDate.getFullYear()
      },
    },
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};