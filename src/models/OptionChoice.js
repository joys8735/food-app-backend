module.exports = (sequelize, DataTypes) => {
    const OptionChoice = sequelize.define('OptionChoice', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      optionGroupId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'optionGroupId' // Явно указываем имя столбца
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
      }
    }, {
      tableName: 'OptionChoices',
      timestamps: true
    });
  
    return OptionChoice;
  };