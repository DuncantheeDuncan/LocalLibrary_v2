
const {Sequelize,DataTypes,Model} = require("sequelize");

const author = (sequelize, DataTypes) => {
  var Author = sequelize.define('Author',{

    first_name:{type: Sequelize.STRING},
    family_name:Sequelize.STRING,
    date_of_death:DataTypes.DATE,
    date_of_birth:DataTypes.DATE
    
  }, {
    classMethods:{
      associate:function(models){
        Author.hasMany(models.Book);
      }
    }
    
  });

  return Author; 
};

module.exports = author;


