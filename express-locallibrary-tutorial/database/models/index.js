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

const db = {
  Author: require('./author')(sequelize, Sequelize),
  Book: require('./book')(sequelize, Sequelize),
  Bookinstance: require('./bookinstance')(sequelize, Sequelize),
  Genre: require('./genre')(sequelize, Sequelize),

};


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }

});


db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
//models/index.js https://github.com/DuncantheeDuncan