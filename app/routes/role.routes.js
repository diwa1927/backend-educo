const Role = require("../models/role.model");

module.exports = function (app) {
  app.get("/api/roles", async (_, res) => {
    try {
      const roles = await Role.findAll();
      res.json(roles);
    } catch (error) {
      console.error("Failed to fetch roles :", error);
      res
        .status(500)
        .json({ message: "Request Failed to fetch roles from server" });
    }
  });
};
