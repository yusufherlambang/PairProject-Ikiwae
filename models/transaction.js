'use strict';
const {
  Model
} = require('sequelize');
const formatDate = require('../helpers/formatDate')

const transporter = require("../nodemailer");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      this.hasOne(models.Invoice, { foreignKey: "TransactionId" });
      this.belongsTo(models.User);
      this.belongsTo(models.Product);
    }

    sendMail(email) {
      const option = {
        from: "CS Ikiwae",
        to: `${email}`,
        subject: "Pembayaran diterima",
        text: "Mohon menunggu pesanan anda walau pun pesanannya tidak akan kami antar hiya hiya hiya!",
      };

      transporter.sendMail(option, (err, info) => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log("Sent: " + info.response);
        }
      });
    }

    get transactionDate() {
      return formatDate(this.createdAt)
    }
    
  }
  Transaction.init(
    {
      numberTrx: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      status: DataTypes.STRING,
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

          instance.numberTrx = `TRX${year}${month}${date}-${getRandomNumberBetween(
            100000,
            200000
          )}`;

          instance.status = "pending";
        },
      },
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};