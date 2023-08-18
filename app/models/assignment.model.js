module.exports = (sequelize, Sequelize) => {
    const Assignment = sequelize.define("assignments", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });
    return Assignment;
}