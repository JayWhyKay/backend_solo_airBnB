'use strict';
const bcrypt = require('bcryptjs');

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
    return queryInterface.bulkInsert('Users', [
      {
        firstName: '',
        lastName: '',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: '',
        lastName: '',
        email: 'user1@user.io',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        username: '',
        email: 'user2@user.io',
        hashedPassword: bcrypt.hashSync('password3')
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
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
