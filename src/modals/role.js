module.exports = (sequelize, Sequelize) => {
    const Roles = sequelize.define("roles", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }, {
        timestamps: false
    });
    return Roles;
};
