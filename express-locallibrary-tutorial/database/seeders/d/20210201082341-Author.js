
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Authors',
    [
      {
        first_name: 'Rothfuss',
        family_name: 'Patrick',
        date_of_birth: '06/06/1973',
        date_of_death: '03/01/2015',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: 'Bova',
        family_name: 'Ben',
        date_of_birth: '08/11/1932',
        date_of_death: '01/01/2010',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Authors', null, {}),
};
