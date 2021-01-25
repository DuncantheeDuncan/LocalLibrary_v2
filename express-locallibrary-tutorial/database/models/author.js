
const { DataTypes,Model } = require("sequelize");
const Sequelize = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  var Author = sequelize.define('Author',{

    first_name:DataTypes.STRING,
    family_name:DataTypes.STRING,
    date_of_death:DataTypes.DATE,
    date_of_birth:DataTypes.DATE,
    url: {type:DataTypes.VIRTUAL, get(){ return '/catolog/author/${this.first_name}'}},
    name:{type:DataTypes.VIRTUAL, get(){return '${this.first_name} ${this.family_name}'}},
  }, {
    classMethods:{
      associate:function(models){
        Author.hasMany(models.Book);
      }
    }
  });

   return Author;


  // const Author = sequelize.define('Author',{
  //   first_name: DataTypes.STRING,
  //   family_name: DataTypes.STRING,
  //   date_of_birth:DataTypes.DATE,
  //   date_of_death: DataTypes.DATE,
  //   url: {
  //     type:DataTypes.VIRTUAL,
  //     get(){
  //       return '/catolog/author/${this.first_name}'// need to get a proper ID value
  //     }
  //   },
  //   name:{
  //     type:DataTypes.VIRTUAL,
  //     get(){
  //       return'${this.first_name} ${this.family_name}';
  //     },
  //     set(value){
  //       throw new Error('Do not set the fullname');
  //     }
  //   }
  // }, {});

  
  
  // Author.associate = function(models){

  //   Author.hasMany(models.Author,{
  //     foreignKey: 'authorId',
  //     as:'books',
  //     onDelete: 'CASCADE',
  //   });
  // };
 
};

