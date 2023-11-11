module.exports = function(app){
    const db = require("../models");
    const Role = db.role;

    app.get("/roles", async(req, res) => {
        try {
            const roles = await Role.findAll();
            res.json(roles);
        } catch (error) {
            console.error("Failed to fetch roles :", error);
            res.status(500).json({ message: "Request Failed to fetch roles from server"});
        }
    });
};