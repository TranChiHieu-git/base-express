module.exports = (sequelize, Sequelize) => {
    const RefreshTokens = sequelize.define("refresh_token", {
        token: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return RefreshTokens;
};
