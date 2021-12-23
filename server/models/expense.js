'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    static associate(models) {
      Expense.belongsTo(models.User, { foreignKey: "userId" });
      Expense.belongsTo(models.Type, { foreignKey: "typeId" });
    }
  };
  Expense.init({
    description: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    date: DataTypes.DATE,
    typeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};