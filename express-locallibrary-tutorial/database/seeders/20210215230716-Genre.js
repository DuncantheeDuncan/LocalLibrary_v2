
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Genres',
    [
      {
        name: 'Fantasy',
        createdAt: new Date(),
        updatedAt: new Date(),
        
      },
      {
        name: 'Science Fiction',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'French Poetry',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Genres', null, {}),
};