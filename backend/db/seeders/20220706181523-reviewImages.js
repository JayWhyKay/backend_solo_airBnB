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

    return queryInterface.bulkInsert('ReviewImages', [
      { reviewId: 1,
        url: "www.wer.cd"
      },
      { reviewId: 1,
        url: "www.123.ca"
      },
      { reviewId: 2,
        url: "www.234.kr/2"
      },
      { reviewId: 3,
        url: "www.wer.cd/3"
      },
      { reviewId: 3,
        url: "www.123.ca/3"
      },
      { reviewId: 2,
        url: "www.234.kr/2"
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
    await queryInterface.bulkDelete('ReviewImages', null, {});
  }
};
