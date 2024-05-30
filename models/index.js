const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config.js');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model.js')(sequelize, DataTypes);
db.Book = require('./book.model.js')(sequelize, DataTypes);

db.User.hasMany(db.Book, { foreignKey: 'sellerId' });
db.Book.belongsTo(db.User, { foreignKey: 'sellerId' });

module.exports = db;
