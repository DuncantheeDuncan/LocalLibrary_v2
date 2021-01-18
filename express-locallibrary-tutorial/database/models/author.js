
const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author',{
    first_name: DataTypes.STRING,
    family_name: DataTypes.STRING,
    date_of_birth:DataTypes.DATE,
    date_of_death: DataTypes.DATE,
    url: {
      type:DataTypes.VIRTUAL,
      get(){
        return '/catolog/Author/${this.first_name}'
      }
    },
    name:{
      type:DataTypes.VIRTUAL,
      get(){
        return'${this.first_name} ${this.family_name}';
      },
      set(value){
        throw new Error('Do not set the fullname');
      }
    }
  }, {});

  console.log("CONNECTED!!!");
  
  Author.associate = function(models){

    Author.hasMany(models.Books,{
      foreignKey: 'authorId',
      as:'books',
      onDelete: 'CASCADE',
    });
  };
  return Author;
};