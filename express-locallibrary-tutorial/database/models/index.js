'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const envConfigs =  require('../config/config');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];


let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, config);
  console.log('SE '+ config.port);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
};


sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});


// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
  // .forEach( function( file ) {
  //   console.log('one two');
  //   // var model = sequelize[ 'import' ]( path.join( __dirname, file ) )
  //   const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  //   db[ model.name ] = model
  // });

// fs
//     .readdirSync('./models')
//     .forEach((file) => {
//     //const model = sequelize.import(path.join('./models', file));
//     const model = require(path.join(__dirname,'models', file))(sequelize, Sequelize)
//     sequelize[model.name] = model;
//     });


const db = {
  Author: require('./author'),
  Book: require('./book'),
};


Object.keys(db).forEach(modelName => {
  console.log('rtrfyguhij');
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }

});


db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
//models/index.js https://github.com/DuncantheeDuncan