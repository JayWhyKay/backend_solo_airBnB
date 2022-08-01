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
        firstName: 'James',
        lastName: 'K',
        email: 'jj@gmail.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Lee',
        lastName: 'Lou',
        email: 'bb@gmail.com',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Gee',
        lastName: 'Dee',
        email: 'cc@user.io',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Gee',
        lastName: 'Dee',
        email: 'qq@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@demo.na',
        hashedPassword: bcrypt.hashSync('password')
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
