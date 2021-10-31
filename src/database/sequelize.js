const Sequelize = require("sequelize");
let sequelize = new Sequelize('book', 'root', 'hieu13011', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.accounts = require("../modals/account")(sequelize, Sequelize);
db.roles = require("../modals/role")(sequelize, Sequelize);
db.users = require("../modals/user")(sequelize, Sequelize);
db.Account_Role = require("../modals/account_role")(sequelize, Sequelize);
db.Refresh_token = require("../modals/refresh_token")(sequelize, Sequelize);

db.accounts.hasOne(db.users);
db.accounts.hasOne(db.Refresh_token);

db.roles.belongsToMany(db.accounts, {through: db.Account_Role});
db.accounts.belongsToMany(db.roles, {through: db.Account_Role});


module.exports = db;
