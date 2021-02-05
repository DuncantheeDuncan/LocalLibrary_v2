const {Sequelize,DataTypes,Model} = require("sequelize");

const book = (sequelize, DataTypes) => {
var Book = sequelize.define('Book',{

    title: DataTypes.TEXT,
    author: DataTypes.TEXT,
    summary: DataTypes.TEXT('long'),
    isbn: DataTypes.STRING,
    genre: {
      type: DataTypes.ENUM,
      values: ['Fantasy', 'French Poetry','Romance','Horro','Science Fiction'],
      defaultValue: 'Science Fiction'
    },


  },{
    classMethods:{
      associate: function(models){
        Book.belogsTo(models.author);
      }
    }
  });

  return Book;
};

module.exports =book;