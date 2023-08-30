const createCalcModel = (sequelize, DataTypes) => {
    return sequelize.define('Calc', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
      },
      equation: {
          type: DataTypes.STRING,
          allowNull: false
      }
    });
};

module.exports = createCalcModel;