const { DataTypes } = require("sequelize");
const db = require("../config/sequelizeDbInstance");

const Role = db.define("roles", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Role;
