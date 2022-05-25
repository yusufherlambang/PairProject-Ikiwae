const { Category, Invoice, Product, Profile, Transaction, User } = require("../models")
const { Op } = require("sequelize");
const formatRupiah = require('../helpers/formatRupiah')
const formatDate = require('../helpers/formatDate')
const bcryptjs = require('bcryptjs')

class Controller {
  static home(req, res) {
    let option = {
      where: {
        stock: {
          [Op.gt]: 0,
        },
      },
    };

    const src = req.query.src;
    const srtp = req.query.srtprc;

    if (src) {
      option.where.name = {
        [Op.iLike]: `%${src}%`,
      };
    }

    if (srtp) {
      if (srtp === "asc") {
        option.order = [["price", "ASC"]];
      } else if (srtp === "desc") {
        option.order = [["price", "DESC"]];
      }
    }

    
    Product.findAll(option)
    .then((data) => {
      res.render("home", { data, formatRupiah });
    })
    .catch((err) => {
        res.send(err);
    });
  }

  static detailProd(req, res) {
    const params = req.params.id;
    Product.findByPk(params).then((data) => {
      res.render("detail-prod", { data, formatRupiah, formatDate });
    });
  }

  static register(req, res) {
    res.render("register");
  }

  static registerPost(req, res) {
    const { firstname, lastname, email, phone, address, gender, birth } =
      req.body;
    Profile.create({
      firstName: firstname,
      lastName: lastname,
      email: email,
      phone: phone,
      address: address,
      gender: gender,
      birthDate: birth,
    }).then((data) => {
      const { username, password } = req.body;
      return User.create({
        username: username,
        password: password,
        ProfileId: data.id,
      });
    });
    res.redirect("/login");
  }

  static login(req, res) {
    const {error} = req.query

    res.render("login", {error});
  }

  static loginPost(req, res) {
    const {username, password } = req.body

    User.findOne({
       where: { username },
       include: [Profile]
    })
    .then(user => {
      if (user) {
        const isValidPassword = bcryptjs.compareSync(password, user.password) //? true/false
  
        if (isValidPassword) {
          req.session.userId = user.id 

          const admin = user.Profile.isAdmin
          req.session.admin = admin //! jika ada admin

          return res.redirect('/')
        } else {
          const error = "Invalid username / password"
          return res.redirect(`/login?error=${error}`)
        }   

      } else {
        const error = "Invalid username / password"
        return res.redirect(`/login?error=${error}`)
      }
    })
    .catch(err => {
      res.send(err)
    })
  }

  static transactionPost(req, res) {
    let { quantity } = req.body;
    const prodID = req.params.idProd;

    Product.findByPk(prodID)
      .then((data) => {
        const total = quantity * data.price;

        return Transaction.create(
          {
            quantity: quantity,
            ProductId: prodID,
            totalPrice: total,
            UserId: 1,
          },
          { returning: ["*"] }
        );
      })
      .then((data) => {
        res.redirect(
          `/transaction/${data.ProductId}?trxid=${data.id}&qty=${quantity}`
        );
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static transaction(req, res) {
    const trxID = Number(req.query.trxid);
    let qty = Number(req.query.qty);
    const from = req.query.from;

    if (from) {
      qty = 1;
    }

    Transaction.findOne({
      where: { id: trxID },
      include: [
        { model: Product },
        {
          model: User,
          include: [Profile],
        },
      ],
    }).then((data) => {
      res.render("transaction", { data, trxID, qty, formatRupiah});
    });
  }

  static calcelTransaction(req, res) {
    const trxID = req.params.idTrx;
    Transaction.destroy({
      where: {
        id: trxID,
      },
    }).then(() => {
      res.redirect("/");
    });
  }

  static editQty(req, res) {
    const trxID = req.params.idTrx;
    Transaction.findOne({ where: { id: trxID }, include: [Product] }).then(
      (data) => {
        res.render("transaction-qty", { data, trxID, formatRupiah });
      }
    );
  }

  static editQtyPost(req, res) {
    const { newQty } = req.body;
    const trxID = req.params.idTrx;
    const prodID = req.query.prod;

    Product.findOne({
      where: {
        id: prodID,
      },
    })
      .then((data) => {
        const total = newQty * data.price;
        return Transaction.update(
          {
            quantity: Number(newQty),
            totalPrice: total,
          },
          {
            where: {
              id: trxID,
            },
          }
        );
      })
      .then((data) => {
        res.redirect(`/transaction/${prodID}?trxid=${trxID}&qty=${newQty}`);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static payment(req, res) {
    const trxID = req.params.idTrx;
    const prodID = req.query.prodID;
    const qty = req.query.qty;
    Transaction.update({ status: "payment" }, { where: { id: trxID } })
      .then(() => {
        return Invoice.create(
          {
            TransactionId: Number(trxID),
          },
          { returning: ["id"] }
        );
      })
      .then((data) => {
        Product.decrement({ stock: qty }, { where: { id: prodID } });
        res.redirect(`/invoice/?inv=${data.id}`);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static invoice(req, res) {
    const invID = req.query.inv;
    Invoice.findOne({ where: { id: invID } }).then((data) => {
      res.render("invoice", { data });
    });
  }

  static getLogOut(req, res) {
  req.session.destroy((err => {
    if (err) {
      res.send(err)
    } else {
      res.redirect('/login')
    }
  }))
  }

  //! Admin
    static admin(req, res) {
    let option1 = {
      logging: false,
      where: {
        stock: {
          [Op.eq]: 0,
        },
        isDeleted: {
          [Op.eq]: false,
        },
      },
    };

    let option2 = {
      logging: false,
      where: {
        isDeleted: {
          [Op.eq]: true,
        },
      },
    };

    let option3 = {
      where: {
        stock: {
          [Op.gt]: 0,
        },
        isDeleted: {
          [Op.eq]: false,
        },
      },
    };

    let outOfStock;
    let deletedProduct;

    Product.findAll(option1)
    .then((data) => {
       outOfStock = data;
      return Product.findAll(option2);
    })
    .then((data) => {
      deletedProduct = data;
      return Product.findAll(option3);
    })
    .then((data) => {
      res.render("admin", { outOfStock, deletedProduct, data });
    })
    .catch((err) => {
      res.send(err);
    });
  }

  static addProd(req, res) {
    Category.findAll().then((data) => {
      res.render("add-product", { data });
    });
  }

  static addProdPost(req, res) {
    const { name, photo, stock, price, shortdesc, longdesc, category } =
      req.body;

    Product.create({
      name: name,
      longDesc: longdesc,
      shortDesc: shortdesc,
      img: photo,
      price: price,
      stock: stock,
      CategoryId: category,
    }).then(() => {
      res.redirect("/admin");
    });
  }

  static profile(req, res) {
    let user = 1;
    let userProfile;
    let transaction;

    User.findByPk(user, {
      include: [Profile],
    })
      .then((data) => {
        userProfile = data;
        return Transaction.findAll({
          where: {
            UserId: userProfile.id,
          },
          include: [Product],
        });
      })
      .then((data) => {
        transaction = data;
        res.render("profile", { transaction, userProfile });
      });
  }

  static deleteProfile(req, res) {
        const id = +req.params.id;

        Profile.destroy({ where: { id } })
        .then( () => {
            res.redirect('/register')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller;