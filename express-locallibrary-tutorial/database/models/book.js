const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Book',{
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    summary: DataTypes.STRING,
    isbn: DataTypes.STRING,
    genre: DataTypes.STRING, // need a way to define it as a Schema type.
    url: {
      type:DataTypes.VIRTUAL,
      get(){
        return '/catolog/book/${this.author}'// need to get a proper ID value
      }
    },

  },{});

  Author.associate = function(models){

    Book.hasMany(models.Book,{
      // foreignKey: 'authorId',
      // as:'books',
      // onDelete: 'CASCADE',
    });
  };

  return Book;

};

