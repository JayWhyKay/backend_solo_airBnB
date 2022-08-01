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
      address: "123 State St",
      city: "Los Angeles",
      state: "California",
      country: "USA",
      lat: 45,
      lng: 140,
      name: "My House",
      description: "Pool heat is included at no additional charge from October through May",
      price: 1011
    },
    {
      ownerId: 1,
      address: "123 Ash St",
      city: "Burbank",
      state: "California",
      country: "USA",
      lat: 35,
      lng: 120,
      name: "Space House",
      description: "When you walk through the gate from the driveway or street, you're immediately welcomed into a very spacious courtyard.",
      price: 1355
    },
    {
      ownerId: 2,
      address: "123123 Beet St",
      city: "Los Angeles",
      state: "California",
      country: "USA",
      lat: -45,
      lng: 110,
      name: "Cali Love",
      description: "You'll want to spend all your time poolside at Shelby Sands!",
      price: 350
    },
    {
      ownerId: 2,
      address: "123123 Colder St",
      city: "Burbank",
      state: "California",
      country: "USA",
      lat: -55,
      lng: -110,
      name: "South Palm",
      description: "For the adventurous types, also within walking distance are some popular hiking trail",
      price: 1355
    },
    {
      ownerId: 3,
      address: "123123 Deermoore St",
      city: "San Francisco",
      state: "California",
      country: "USA",
      lat: -65.123,
      lng: -110.123,
      name: "Our House",
      description: "This home is very close to the shuttle stops in Palm Springs.",
      price: 66
    },
    {
      ownerId: 3,
      address: "1231233 East Ave",
      city: "Palm Springs",
      state: "California",
      country: "USA",
      lat: -65.234,
      lng: -110.234,
      name: "Peach Residence",
      description: "Ping Pong, Pool Table, Fire Pit & more!",
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
