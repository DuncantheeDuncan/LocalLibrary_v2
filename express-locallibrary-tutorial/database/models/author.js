
const { Sequelize,DataTypes,Model } = require("sequelize");

const author = (sequelize, DataTypes) => {
      var Author = sequelize.define('Author',{

    first_name:{type: Sequelize.STRING},
    family_name:Sequelize.STRING,
    date_of_death:DataTypes.DATE,
    date_of_birth:DataTypes.DATE,
    url: {type:DataTypes.VIRTUAL, get(){ return '/catolog/author/${this.first_name}'}},
    // name:{type:Sequelize.VIRTUAL, get(){return '${this.first_name} ${this.family_name}'}},
    // name:{type:DataTypes.VIRTUAL, get(){return first_name}},
    // name: {
    //     type: Sequelize.VIRTUAL(Sequelize.STRING(20), "(`Authors`.first_name) as Author")
    // }
    // name:{
    //   type: DataTypes.VIRTUAL(DataTypes.STRING, ['first_name', 'family_name']),
    //   get name(){return '${this.first_name}'}
    // },

  }, {
    classMethods:{
      associate:function(models){
        Author.hasMany(models.Book);
        console.log(name);
      }
    }
    
  });


   return Author; 
};


module.exports = author;
 
