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
        url: 'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NDZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      },
      { spotId: 2,
        url: 'https://images.unsplash.com/photo-1608045742930-48cee6018255?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NDd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      },
      { spotId: 3,
        url: 'https://images.unsplash.com/photo-1567428485548-c499e4931c10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Njh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      },
      { spotId: 1,
        url: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW5kb29yc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
      },
      { spotId: 2,
        url: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGluZG9vcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
      },
      { spotId: 3,
        url: 'https://images.unsplash.com/photo-1623920996292-42a1930285a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fGluZG9vcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
      },
      { spotId: 1,
        url: 'https://images.unsplash.com/photo-1615874694520-474822394e73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG9tZSUyMGRlY29yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      },
      { spotId: 2,
        url: 'https://images.unsplash.com/photo-1616046080409-a7c37f84ce15?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDN8fGhvbWUlMjBkZWNvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
      },
      { spotId: 3,
        url: 'https://images.unsplash.com/photo-1615875221248-d4b820203f97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fGhvbWUlMjBkZWNvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
      },
      { spotId: 1,
        url: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJlZHJvb218ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
      },
      { spotId: 2,
        url: 'https://images.unsplash.com/photo-1578898887932-dce23a595ad4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGJlZHJvb218ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
      },
      { spotId: 3,
        url: 'https://images.unsplash.com/photo-1632210702485-e1841e30752a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGJlZHJvb218ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
      },
      { spotId: 1,
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmF0aHJvb218ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
      },
      { spotId: 1,
        url: 'https://images.unsplash.com/photo-1658947051795-1bbc7e132847?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=300&q=60'
      },
      { spotId: 2,
        url: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmF0aHJvb218ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
      },
      { spotId: 3,
        url: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJhdGhyb29tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      },
      { spotId: 4,
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
      },
      { spotId: 4,
        url: 'https://media.istockphoto.com/photos/interior-and-exterior-design-of-pool-villa-with-swimming-pool-picture-id918342482?k=20&m=918342482&s=170667a&w=0&h=59LgUC91MXY2mI6gLzUlZ2LQVFFa9PFhhPcfxLd8Sqk='
      },
      { spotId: 5,
        url: 'https://images.unsplash.com/photo-1508330570239-ce7cabceee22?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw0OTcyNTAzfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=300&q=60'
      },
      { spotId: 5,
        url: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
      },
      { spotId: 5,
        url: 'https://images.unsplash.com/photo-1600047508788-786f3865b4b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
      },
      { spotId: 5,
        url: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=300&q=60'
      },
      { spotId: 5,
        url: 'https://images.unsplash.com/photo-1600566752229-250ed79470f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=300&q=60'
      },
      { spotId: 6,
        url: 'https://images.unsplash.com/photo-1600585153490-76fb20a32601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=300&q=60'
      },
      { spotId: 6,
        url: 'https://images.unsplash.com/photo-1604014238312-ccb88904fa7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=300&q=60'
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
