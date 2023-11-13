// models/User.js

const { DataTypes } = require("sequelize");
const db = require("../config/sequelizeDbInstance");
const Role = require("./role.model");
const Code = require("./code.model");

const User = db.define("users", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  class: {
    type: DataTypes.STRING,
  },
  roleId: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
});

User.hasMany(Code, {
  onDelete: "CASCADE",
});
Code.belongsTo(User);

User.belongsTo(Role, { foreignKey: "roleId" });

module.exports = User;
