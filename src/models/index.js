const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = require('../config/database');

const Category = require('./Category')(sequelize, DataTypes);
const Banner = require('./Banner')(sequelize, DataTypes);
const Product = require('./Product')(sequelize, DataTypes);

// Определяем связи
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

module.exports = {
  sequelize,
  Sequelize,
  DataTypes,
  Op,
  Category,
  Banner,
  Product
};