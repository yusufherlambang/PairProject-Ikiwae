const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "aliansyah720@gmail.com",
    pass: "beifong2pop",
  },
});

module.exports = transporter;
