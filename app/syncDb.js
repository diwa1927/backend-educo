const sequelize = require("./config/sequelizeDbInstance"); // // Adjust the path based on your project structure
const syncDb = async () => {
  await sequelize.sync({ force: true }).then(() => {
    console.log("Database and tables created!");
  });
};

// syncDb();
