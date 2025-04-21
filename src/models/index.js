const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = require('../config/database');

const Category = require('./Category')(sequelize, DataTypes);
const Banner = require('./Banner')(sequelize, DataTypes);
const Product = require('./Product')(sequelize, DataTypes);
const OptionGroup = require('./OptionGroup')(sequelize, DataTypes);
const OptionChoice = require('./OptionChoice')(sequelize, DataTypes);
const User = require('./User')(sequelize, DataTypes);

Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
OptionGroup.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
OptionChoice.belongsTo(OptionGroup, { foreignKey: 'optionGroupId', as: 'optionGroup' });
Product.hasMany(OptionGroup, { foreignKey: 'productId', as: 'options' });
OptionGroup.hasMany(OptionChoice, { foreignKey: 'optionGroupId', as: 'choices' });

module.exports = {
  sequelize,
  Sequelize,
  DataTypes,
  Op,
  Category,
  Banner,
  Product,
  OptionGroup,
  OptionChoice,
  User
};