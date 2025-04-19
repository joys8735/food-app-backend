module.exports = (sequelize, DataTypes) => {
    const OptionGroup = sequelize.define('OptionGroup', {
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
      type: {
        type: DataTypes.ENUM('radio', 'checkbox'),
        allowNull: false
      },
      required: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      tableName: 'OptionGroups',
      timestamps: true
    });
  
    return OptionGroup;
  };