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
    getAllByKey: async (req, res) => {
        try {
            let whereKey = null;
            let whereUserKey = null;
            let whereRolesKey = null;
            let limit = null;
            let offset = null;
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
                if (req.query.page && req.query.pageSize) {
                    limit = parseInt(req.query.pageSize);
                    offset = (parseInt(req.query.page) - 1) * parseInt(req.query.pageSize);
                }
            }
            let result = await accountService.getAllWithIncludeByKey({
                where: whereKey,
                include: [
                    {
                        model: db.users, where: whereUserKey
                    },
                    {
                        model: db.roles, where: whereRolesKey
                    }
                ],
                limit: limit,
                offset: offset,
            });
            if (!result) return res.status(400).json({status: false, msg: "Không tìm thấy dữ liệu!", result: null});
            return res.status(200).json({
                status: true,
                msg: "Lấy dữ liệu thành công",
                pagination: (req.query.page && req.query.pageSize) && {
                    page: parseInt(req.query.page),
                    pageSize: parseInt(req.query.pageSize),
                    total: result.count,
                },
                result: [...result.rows.map(x => {
                    x.dataValues.password = "Không công khai!";
                    return x.dataValues;
                })],
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({status: false, msg: "Lấy dữ liệu thất bại!", result: null});
        }
    }
}
