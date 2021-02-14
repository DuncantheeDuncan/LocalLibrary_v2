'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bookinstances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      book: {
        type: Sequelize.TEXT
      },
      imprint: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('bookinstances');
  }
};