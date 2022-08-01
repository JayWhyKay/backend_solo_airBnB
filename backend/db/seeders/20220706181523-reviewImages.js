"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert(
      "ReviewImages",
      [
        {
          reviewId: 1,
          url:
            "https://images.unsplash.com/photo-1657299170129-858a7f31a794?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8ZmFtaWx5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        },
        {
          reviewId: 1,
          url:
            "https://images.unsplash.com/photo-1657299156075-12b8c0a2da38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60",
        },
        {
          reviewId: 1,
          url:
            "https://images.unsplash.com/photo-1659098602926-969fc12ef61a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=60",
        },
        {
          reviewId: 1,
          url:
            "https://images.unsplash.com/photo-1659044348016-34c5d248b57a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        },
        {
          reviewId: 2,
          url:
            "https://images.unsplash.com/photo-1657299170240-a1f811379b57?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw0Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        },
        {
          reviewId: 2,
          url:
            "https://images.unsplash.com/photo-1659016376082-34a9256c66c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OXx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        },
        {
          reviewId: 2,
          url:
            "https://images.unsplash.com/photo-1658893769271-c2461cab05b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMTR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=300&q=60",
        },
        {
          reviewId: 3,
          url:
            "https://images.unsplash.com/photo-1658941854929-14f85ea8397e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMTh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=300&q=60",
        },
        {
          reviewId: 4,
          url:
            "https://images.unsplash.com/photo-1659259540123-72eb0eb77357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        },
        {
          reviewId: 4,
          url:
            "https://images.unsplash.com/photo-1659205619507-e3892b32947a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        },
        {
          reviewId: 4,
          url:
            "https://images.unsplash.com/photo-1659259906927-eb207ff241c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1N3x8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60",
        },
        {
          reviewId: 4,
          url:
            "https://images.unsplash.com/photo-1659114538192-0f8caaaaa698?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMDB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=300&q=60",
        },
        {
          reviewId: 5,
          url:
            "https://images.unsplash.com/photo-1657299156537-f4bcdced5392?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMTB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=300&q=60",
        },
        {
          reviewId: 5,
          url:
            "https://images.unsplash.com/photo-1659205220238-2b8ec6b49592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMTZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=300&q=60",
        },
        {
          reviewId: 5,
          url:
            "https://images.unsplash.com/photo-1659193705708-2761c2542f84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=300&q=60",
        },
        {
          reviewId: 5,
          url:
            "https://images.unsplash.com/photo-1637502875124-eb4a9843a2fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNDB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=300&q=60",
        },
        {
          reviewId: 6,
          url:
            "https://images.unsplash.com/photo-1657299156000-2cccaea36b2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNjR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=300&q=60",
        },
        {
          reviewId: 7,
          url:
            "https://images.unsplash.com/photo-1659175339922-cb77ad0d31a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNzF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=300&q=60",
        },
        {
          reviewId: 8,
          url:
            "https://images.unsplash.com/photo-1659129798121-5ee2a0e905ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOTB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=300&q=60",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("ReviewImages", null, {});
  },
};
