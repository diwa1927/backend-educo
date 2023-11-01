module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        class: {
            type: Sequelize.STRING
        }
    });

    // Tambahkan asosiasi dengan model Code
    User.associate = (models) => {
        User.hasMany(models.Code, {
        foreignKey: 'userId',
        });
    };

    return User;
};