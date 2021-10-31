module.exports = (sequelize, Sequelize) => {
    const Account_Role = sequelize.define("account_role", {}, {
        timestamps: false
    });
    return Account_Role;
};
