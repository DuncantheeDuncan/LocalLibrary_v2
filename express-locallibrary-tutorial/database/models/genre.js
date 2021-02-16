// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Genre extends Model {
//     *
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
     
//     static associate(models) {
//       // define association here
//     }
//   };
//   Genre.init({
//     name: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Genre',
//   });
//   return Genre;
// };

const {Sequelize,DataTypes,Model} = require("sequelize");

const genre = (sequelize, DataTypes) => {
  var Genre = sequelize.define('Genre',{

    name:{type: Sequelize.STRING},
  
    
  }, {
    classMethods:{
      associate:function(models){
        Genre.belogsTo(models.Book);
      }
    }
    
  });

  return Genre; 
};

module.exports = genre;


