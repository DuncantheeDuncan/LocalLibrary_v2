
const {Sequelize,DataTypes,Model} = require("sequelize");

const bookinstance = (sequelize, DataTypes) => {
var Bookinstance = sequelize.define('bookinstance',{
   book: DataTypes.TEXT,
    imprint: DataTypes.TEXT,
    due_back: DataTypes.DATE,
    status: {
      type:DataTypes.ENUM,
      values:['Available', 'Maintenance', 'Loaned', 'Reserved'],
      default: 'Maintenance'
    }

  },{
    classMethods:{
      associate: function(models){
        Bookinstance.belogsTo(models.book);
      }
    }
  });

  return Bookinstance;
};

module.exports =bookinstance;