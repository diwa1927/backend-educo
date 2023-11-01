module.exports = (sequelize, Sequelize) => {
    const Code = sequelize.define("Code", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Menambahkan auto-increment
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userCode: {
            type: Sequelize.TEXT, // Menggunakan TEXT untuk kode yang lebih panjang
            allowNull: false, // Menandakan bahwa code tidak boleh null
        },
        userInput: {
            type: Sequelize.TEXT, // Menggunakan TEXT untuk input yang lebih panjang
        },
    });
    
    // Tambahkan kolom userId sebagai kunci asing
    Code.associate = (models) => {
        Code.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    });
  };

    return Code;
};  