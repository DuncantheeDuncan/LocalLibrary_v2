const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {

var Book = sequelize.define('Book',{
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    summary: DataTypes.TEXT,
    isbn: DataTypes.STRING,
    genre: DataTypes.TEXT, // need a way to define it as a Schema type.
    url: {
      type:DataTypes.VIRTUAL,
      get(){
        return '/catolog/book/${this.author}'// need to get a proper ID value
      }
    }

  },{
    classMethods:{
      associate: function(models){
        Book.belogsTo(models.author);
      }
    }
  });

  return Book;

  // var Book = sequelize.define('Book',{
  //   title: DataTypes.STRING,
  //   author: DataTypes.STRING,
  //   summary: DataTypes.TEXT,
  //   isbn: DataTypes.STRING,
  //   genre: DataTypes.TEXT, // need a way to define it as a Schema type.
  //   url: {
  //     type:DataTypes.VIRTUAL,
  //     get(){
  //       return '/catolog/book/${this.author}'// need to get a proper ID value
  //     }
  //   },

  // },{});

  // Book.associate = function(models){

  //   Book.hasMany(models.Book,{
  //     // foreignKey: 'authorId',
  //     // as:'books',
  //     // onDelete: 'CASCADE',
  //   });
  // };


};

