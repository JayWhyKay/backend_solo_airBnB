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
    return queryInterface.bulkInsert('SpotsImages', [
      { spotId: 1,
        url: "www.wer.cd"
      },
      { spotId: 1,
        url: "www.123.ca"
      },
      { spotId: 1,
        url: "www.234.kr"
      },
      { spotId: 2,
        url: "www.wer.cd"
      },
      { spotId: 2,
        url: "www.123.ca"
      },
      { spotId: 2,
        url: "www.234.kr"
      },
      { spotId: 2,
        url: "www.wer.cd"
      },
      { spotId: 3,
        url: "www.123.ca"
      },
      { spotId: 3,
        url: "www.234.kr"
      },
      { spotId: 4,
        url: "www.wer.cd"
      },
      { spotId: 5,
        url: "www.123.ca"
      },
      { spotId: 6,
        url: "www.234.kr"
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
    await queryInterface.bulkDelete('SpotsImages', null, {});
  }
};
