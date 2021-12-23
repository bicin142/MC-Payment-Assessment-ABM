'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    static associate(models) {
      Type.belongsTo(models.User, { foreignKey: "userId" });
      Type.hasMany(models.Expense, { foreignKey: "typeId" });
    }
  };
  Type.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Type',
  });
  return Type;
};