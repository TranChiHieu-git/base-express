module.exports = (sequelize, Sequelize) => {
    const Accounts = sequelize.define("accounts", {
        account: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });
    return Accounts;
};
