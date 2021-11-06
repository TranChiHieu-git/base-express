const {accounts, Account_Role} = require("../database/sequelize");
const db = require("../database/sequelize");
module.exports = {
    create: async (account) => {
        try {
            let accountNew = await accounts.create(account);
            await Account_Role.create({
                roleId: 2,
                accountId: accountNew.dataValues.id,
            });
            return accountNew;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    getOneByKey: async (key) => {
        let accountFinded = await accounts.findOne({
            where: {
                ...key
            },
            include: [
                {model: db.users},
                {model: db.roles},
            ],
        });
        return accountFinded;
    },
    getOneAllIncludeByKey: async (key) => {
        let accountFinded = await accounts.findOne({
            ...key
        });
        return accountFinded;
    },
    getAllWithIncludeByKey: async (key) => {
        let accountFinded = await accounts.findAndCountAll({
            ...key
        });
        return accountFinded;
    }
}
