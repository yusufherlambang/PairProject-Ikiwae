"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate("Transactions", {
      status: "pending",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate("Transactions", {
      status: null,
    });
  },
};
