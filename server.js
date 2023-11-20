const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
const sequelize = require("./app/config/sequelizeDbInstance");
const session = require("express-session");

const PORT = process.env.PORT || 8080;

dotenv.config();

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());

app.get("/", (_, res) => {
  res.json({ message: "Welcome to Database Educo, database is connected!" });
});

// Sync the models with the database
sequelize.sync().then(() => {
  console.log("Database and tables created!");
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/role.routes")(app);
require("./app/routes/assignment.routes")(app);
require("./app/routes/code.routes")(app);

app.listen(PORT, () => {
  console.log(` Server listening on port ${PORT} `);
});
