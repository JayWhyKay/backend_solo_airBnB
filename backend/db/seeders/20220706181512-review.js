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

    return queryInterface.bulkInsert('Reviews', [
      { userId: 1,
        spotId: 3,
        review: "asdfasdfasdfadf",
        stars: 3
      },
      { userId: 1,
        spotId: 4,
        review: "asdfasdfasdfadf",
        stars: 4
      },
      { userId: 1,
        spotId: 5,
        review: "qwerqwer",
        stars: 5
      },
      { userId: 1,
        spotId: 6,
        review: "zcxvxcvzxcv",
        stars: 4
      },
      { userId: 2,
        spotId: 1,
        review: "asdfasdfasdfadf",
        stars: 3
      },
      { userId: 2,
        spotId: 2,
        review: "asdfasdfasdfadf",
        stars: 4
      },
      { userId: 2,
        spotId: 5,
        review: "qwerqwer",
        stars: 5
      },
      { userId: 2,
        spotId: 6,
        review: "zcxvxcvzxcv",
        stars: 4
      },
      { userId: 3,
        spotId: 1,
        review: "asdfasdfasdfadf",
        stars: 3
      },
      { userId: 3,
        spotId: 2,
        review: "asdfasdfasdfadf",
        stars: 4
      },
      { userId: 3,
        spotId: 3,
        review: "qwerqwer",
        stars: 5
      },
      { userId: 3,
        spotId: 4,
        review: "zcxvxcvzxcv",
        stars: 4
      },
      { userId: 1,
        spotId: 1,
        review: "asdfasdfasdfadf",
        stars: 5
      },
      { userId: 1,
        spotId: 1,
        review: "asdfasdfasdfadf",
        stars: 4
      },
      { userId: 1,
        spotId: 1,
        review: "qwerqwer",
        stars: 5
      },
      { userId: 1,
        spotId: 1,
        review: "zcxvxcvzxcv",
        stars: 4
      },
      { userId: 2,
        spotId: 2,
        review: "asdfasdfasdfadf",
        stars: 3
      },
      { userId: 2,
        spotId: 2,
        review: "asdfasdfasdfadf",
        stars: 4
      },
      { userId: 2,
        spotId: 2,
        review: "qwerqwer",
        stars: 5
      },
      { userId: 2,
        spotId: 2,
        review: "zcxvxcvzxcv",
        stars: 5
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
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
