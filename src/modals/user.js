module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        full_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });
    return Users;
};
