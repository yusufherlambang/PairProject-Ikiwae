'use strict';
const { Model, Transaction } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    static associate(models) {
      this.belongsTo(models.Transaction);
    }
  }
  Invoice.init(
    {
      numberInv: DataTypes.STRING,
      TransactionId: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate: (instance) => {
          let now = new Date();

          function getRandomNumberBetween(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
          }

          let year = now.getFullYear();
          let month = now.getMonth();
          let date = now.getDate();

          instance.numberInv = `INV${year}${month}${date}-${getRandomNumberBetween(
            500000,
            700000
          )}`;
        },
      },
      sequelize,
      modelName: "Invoice",
    }
  );
  return Invoice;
};