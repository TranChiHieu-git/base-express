const accountService = require("../repositories/accounts.repository");
const db = require("../database/sequelize");
module.exports = {
    getOneByKey: async (req, res) => {
        try {
            let whereKey = null;
            let whereUserKey = null;
            let whereRolesKey = null;
            if (req.query) {
                if (req.query.id) {
                    if (whereKey === null) {
                        whereKey = {}
                    }
                    whereKey.id = req.query.id;
                }
                if (req.query.account) {
                    if (whereKey === null) {
                        whereKey = {}
                    }
                    whereKey.account = req.query.account;
                }
                if (req.query.userId) {
                    if (whereUserKey === null) {
                        whereUserKey = {}
                    }
                    whereUserKey.id = req.query.userId;
                }
                if (req.query.userName) {
                    if (whereUserKey === null) {
                        whereUserKey = {}
                    }
                    whereUserKey.full_name = req.query.userName;
                }
                if (req.query.userEmail) {
                    if (whereUserKey === null) {
                        whereUserKey = {}
                    }
                    whereUserKey.email = req.query.userEmail;
                }
                if (req.query.roleId) {
                    if (whereRolesKey === null) {
                        whereRolesKey = {}
                    }
                    whereRolesKey.id = req.query.roleId;
                }
                if (req.query.roleName) {
                    if (whereRolesKey === null) {
                        whereRolesKey = {}
                    }
                    whereRolesKey.name = req.query.roleName;
                }
            }
            let result = await accountService.getOneAllIncludeByKey({
                where: whereKey,
                include: [
                    {
                        model: db.users, where: whereUserKey
                    },
                    {
                        model: db.roles, where: whereRolesKey
                    }
                ],
            });
            if (!result) return res.status(400).json({status: false, msg: "Không tìm thấy dữ liệu!", result: null});
            return res.status(200).json({
                status: true,
                msg: "Lấy dữ liệu thành công",
                result: {...result.dataValues, password: "Không công khai!"}
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({status: false, msg: "Lấy dữ liệu thất bại!", result: null});
        }
    },
    getOneById: async (req, res) => {
        try {
            let result = await accountService.getOneByKey({id: req.params.id});
            if (!result) return res.status(400).json({status: false, msg: "Không tìm thấy dữ liệu!", result: null});
            return res.status(200).json({
                status: true,
                msg: "Lấy dữ liệu thành công",
                result: {...result.dataValues, password: "Không công khai!"}
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({status: false, msg: "Lấy dữ liệu thất bại!", result: null});
        }
    },
}
