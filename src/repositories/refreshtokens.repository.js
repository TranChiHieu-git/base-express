const {Refresh_token} = require("../database/sequelize");
const db = require("../database/sequelize");
module.exports = {
    create: async (refreshToken) => {
        try {
            await Refresh_token.create(refreshToken);
        } catch (err) {
            console.log(err);
        }
    },
    delete: async (key) => {
        await Refresh_token.destroy({
            force: true,
            where: {
                ...key
            }
        });
    },
    getOneByKey: async (key) => {
        let refreshToken = await Refresh_token.findOne({
            where: {
                ...key
            }
        });
        return refreshToken;
    }
}
