const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  isVegetarian: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  originalPrice: {
    type: DataTypes.FLOAT,
  },
  categoryId: {
    type: DataTypes.STRING,
  },
});

module.exports = Product;