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
        url: 'https://images.unsplash.com/photo-1657299170129-858a7f31a794?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8ZmFtaWx5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      },
      { reviewId: 1,
        url: 'https://images.unsplash.com/photo-1657299156075-12b8c0a2da38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60'
      },
      { reviewId: 1,
        url: 'https://images.unsplash.com/photo-1659098602926-969fc12ef61a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=60'
      },
      { reviewId: 1,
        url: 'https://images.unsplash.com/photo-1659044348016-34c5d248b57a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60'
      },
      { reviewId: 2,
        url: 'https://images.unsplash.com/photo-1657299170240-a1f811379b57?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw0Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60'
      },
      { reviewId: 2,
        url: 'https://images.unsplash.com/photo-1659016376082-34a9256c66c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OXx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60'
      },
      { reviewId: 2,
        url: 'https://images.unsplash.com/photo-1658893769271-c2461cab05b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMTR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=300&q=60'
      },
      { reviewId: 2,
        url: 'https://images.unsplash.com/photo-1658941854929-14f85ea8397e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMTh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=300&q=60'
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
