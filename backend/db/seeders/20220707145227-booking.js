'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("Bookings", [
      {
        "spotId": 1,
        "userId": 1,
        "startDate": "2022-11-19",
        "endDate": "2022-11-20",
      },
      {
        "spotId": 2,
        "userId": 1,
        "startDate": "2022-11-20",
        "endDate": "2022-11-21",
      },
      {
        "spotId": 3,
        "userId": 1,
        "startDate": "2022-11-19",
        "endDate": "2022-11-20",
      },
      {
        "spotId": 1,
        "userId": 2,
        "startDate": "2021-11-29",
        "endDate": "2021-11-30",
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings', null, {})
  }
};
