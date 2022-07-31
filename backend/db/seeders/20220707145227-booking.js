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
        "startDate": "2022-07-14",
        "endDate": "2022-07-15"
      },
      {
        "spotId": 1,
        "userId": 1,
        "startDate": "2022-07-16",
        "endDate": "2022-07-17"
      },
      {
        "spotId": 2,
        "userId": 1,
        "startDate": "2022-07-18",
        "endDate": "2022-07-19"
      },
      {
        "spotId": 2,
        "userId": 3,
        "startDate": "2022-07-20",
        "endDate": "2022-07-22"
      },
      {
        "spotId": 3,
        "userId": 3,
        "startDate": "2022-07-23",
        "endDate": "2022-07-25"
      },
      {
        "spotId": 1,
        "userId": 4,
        "startDate": "2022-07-26",
        "endDate": "2022-07-27"
      },
      {
        "spotId": 1,
        "userId": 4,
        "startDate": "2022-07-28",
        "endDate": "2022-07-29"
      },
      {
        "spotId": 2,
        "userId": 4,
        "startDate": "2022-07-30",
        "endDate": "2022-08-01"
      },
      {
        "spotId": 2,
        "userId": 4,
        "startDate": "2022-01-20",
        "endDate": "2022-01-22"
      },
      {
        "spotId": 3,
        "userId": 4,
        "startDate": "2022-01-23",
        "endDate": "2022-01-25"
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
