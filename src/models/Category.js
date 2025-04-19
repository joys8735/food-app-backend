module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Categories',
    timestamps: true
  });

  return Category;
};