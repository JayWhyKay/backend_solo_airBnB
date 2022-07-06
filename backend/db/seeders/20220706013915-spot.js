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
      price: 155
    }
    // { ownerId: 1,
    //   address: "123 asdfe st",
    //   city: "Burbank",
    //   state: "California",
    //   country: "USA",
    //   lat: 35,
    //   lng: 120,
    //   name: "my doub Crib",
    //   description: "beautiful place to rent for someone",
    //   price: 1355
    // },
    // { ownerId: 2,
    //   address: "123 asasddf st",
    //   city: "Los Angeles",
    //   state: "California",
    //   country: "USA",
    //   lat: 66,
    //   lng: 110,
    //   name: "my Crib",
    //   description: "beautiful place to rent for someone",
    //   price: 66
    // }
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
