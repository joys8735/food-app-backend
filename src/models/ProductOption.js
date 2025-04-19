module.exports = (sequelize, DataTypes) => {
    const ProductOption = sequelize.define('ProductOption', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      productId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      extraPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
      }
    }, {
      tableName: 'ProductOptions',
      timestamps: true
    });
  
    return ProductOption;
  };