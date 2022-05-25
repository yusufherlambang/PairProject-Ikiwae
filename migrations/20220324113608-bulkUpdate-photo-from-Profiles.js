"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate("Profiles", {
      photo: "https://randomuser.me/api/portraits/men/1.jpg",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate("Profiles", {
      photo: null,
    });
  },
};
