"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate("Products", {
      isDeleted: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate("Products", {
      isDeleted: null,
    });
  },
};
