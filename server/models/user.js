"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Income, { foreignKey: "userId" });
      User.hasMany(models.Expense, { foreignKey: "userId" });
      User.hasMany(models.Type, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Please input email." },
          notNull: { msg: "Please input email" },
          isEmail: { msg: "Please input a valid email" },
        },
        unique: {
          args: true,
          msg: "Email address already in use, please use a different email",
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Please input password" },
          notNull: { msg: "Please input password" },
          len: {
            args: { min: 5 },
            msg: "Password length must be at least 5 characters",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(newUser) {
          newUser.password = hashPassword(newUser.password);
        },
      },
    }
  );
  return User;
};
