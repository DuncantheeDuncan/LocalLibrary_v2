
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author',{
    first_name: DataTypes.STRING,
    family_name: DataTypes.STRING,
    date_of_birth:DataTypes.DATE,
    date_of_death: DataTypes.DATE
  }, {});
  Author.associate = function(models){

    Author.hasMany(models.Books,{
      foreignKey: 'authorId',
      as:'books',
      onDelete: 'CASCADE',
    });
  };
  return Author;
};