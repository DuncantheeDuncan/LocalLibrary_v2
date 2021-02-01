'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.TEXT
      },
      author: {
        type: Sequelize.TEXT
      },
      summary: {
        type: Sequelize.TEXT('long')
      },
      isbn: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.ENUM,
        values: ['Fantasy', 'French Poetry','Romance','Horro','Science Fiction'],
        defaultValue: 'Science Fiction'
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
    await queryInterface.dropTable('Books');
  }
};