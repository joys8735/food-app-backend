module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Products',
    timestamps: true
  });

  return Product;
};