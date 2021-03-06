
const {Sequelize,DataTypes,Model} = require("sequelize");

const bookinstance = (sequelize, DataTypes) => {
  var Bookinstance = sequelize.define('Bookinstance',{

   book: DataTypes.TEXT('long'),
   imprint: DataTypes.TEXT('long'),
   due_back: DataTypes.DATE,
   status: {
    type:DataTypes.ENUM,
    values:['Available', 'Maintenance', 'Loaned', 'Reserved'],
    default: 'Maintenance'
  },

},{
  classMethods:{
    associate: function(models){
      Bookinstance.belogsTo(models.Book);
       // Bookinstance.hasMany(models.Book);
    }
  }
});

  return Bookinstance;
};

module.exports =bookinstance;