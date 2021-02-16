'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookinstances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      book: {
        type: Sequelize.TEXT('long')
      },
      imprint: {
        type: Sequelize.TEXT('long')
      },
      due_back: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM,
        values:['Available', 'Maintenance', 'Loaned', 'Reserved'],
        default: 'Maintenance'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookinstances');
  }
};