// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     *
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
    
//   },

//   down: async (queryInterface, Sequelize) => {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };


module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Authors',
    [
      {
        first_name: 'Jack',
        family_name: 'Shabangu',
        date_of_birth: '12/01/20002',
        date_of_death: '12/01/20002',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: 'Mthobisi',
        family_name: 'Ngcobo',
        date_of_birth: '12/01/20002',
        date_of_death: '12/01/20002',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Authors', null, {}),
};