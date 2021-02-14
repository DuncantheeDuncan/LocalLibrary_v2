
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'bookinstances',
    [
      {
        book: 'The Name of the Wind (The Kingkiller Chronicle, #1)',
        imprint: 'Imprint XXX2',
        due_back: '03/01/2015',
        status: 'Available',
        createdAt: new Date(),
        updatedAt: new Date(),
        
      },
      {
        book: 'Test Book 1',
        imprint: 'Imprint XXX3',
        due_back: '03/01/2015',
        status: 'Loaned',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Books', null, {}),
};