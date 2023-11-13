const { DataTypes } = require("sequelize");
const db = require("../config/sequelizeDbInstance");

const Code = db.define("codes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Menambahkan auto-increment
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userCode: {
    type: DataTypes.TEXT, // Menggunakan TEXT untuk kode yang lebih panjang
    allowNull: false, // Menandakan bahwa code tidak boleh null
  },
  userInput: {
    type: DataTypes.TEXT, // Menggunakan TEXT untuk input yang lebih panjang
  },
});

module.exports = Code;
