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
    return queryInterface.bulkInsert('Spots', [
    {
      ownerId: 1,
      address: "123 asdf st",
      city: "Los Angeles",
      state: "California",
      country: "USA",
      lat: 45,
      lng: 140,
      name: "my Crib",
      description: "beautiful place to rent for someone",
      price: 10
    },
    {
      ownerId: 1,
      address: "123 asdfe st",
      city: "Burbank",
      state: "California",
      country: "USA",
      lat: 35,
      lng: 120,
      name: "my doub Crib",
      description: "beautiful place to rent for someone",
      price: 1355
    },
    {
      ownerId: 2,
      address: "123123 asdf st",
      city: "Los Angeles",
      state: "California",
      country: "USA",
      lat: -45,
      lng: 110,
      name: "my Crib",
      description: "beautiful place to rent for someone",
      price: 155
    },
    {
      ownerId: 2,
      address: "123123 asdfe st",
      city: "Burbank",
      state: "California",
      country: "USA",
      lat: -55,
      lng: -110,
      name: "my doub Crib",
      description: "beautiful place to rent for someone",
      price: 1355
    },
    {
      ownerId: 3,
      address: "123123 asasddf st",
      city: "Los Angeles",
      state: "California",
      country: "USA",
      lat: -65.123,
      lng: -110.123,
      name: "my Crib",
      description: "beautiful place to rent for someone",
      price: 66
    },
    {
      ownerId: 3,
      address: "1231233 asasddf st",
      city: "Los Angeles",
      state: "California",
      country: "USA",
      lat: -65.234,
      lng: -110.234,
      name: "my Crib",
      description: "beautiful place to rent for someone",
      price: 6644
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Spots', null, {});
  }
};
