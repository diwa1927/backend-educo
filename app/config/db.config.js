const dotenv = require("dotenv"); // Load environment variables from a .env file
dotenv.config();

const config = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USERNAME || "defaultUsername",
  PASSWORD: process.env.DB_PASSWORD || "defaultPassword",
  DB: process.env.DB_NAME || "mydatabase",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = config;
