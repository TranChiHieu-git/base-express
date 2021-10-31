const JSONConfig = require("../configs");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const accountService = require("../repositories/accounts.repository");
const refreshTokenService = require("../repositories/refreshtokens.repository");
const {checkAccount, checkPassword} = require("../utils");

module.exports = {
    login: async (req, res) => {
        try {
            if (!req.body) return res.status(400).json({status: false});
            if (!req.body.account || !checkAccount(req.body.account)) return res.status(200).json({
                status: false,
                field: "account",
                msg: "Tài khoản không đúng định dạng!"
            });
            if (!req.body.password || !checkPassword(req.body.password)) return res.status(200).json({
                status: false,
                field: "password",
                msg: "Mật khẩu không đúng định dạng!"
            });
            let accountLogin = await accountService.getOneByKey({account: req.body.account});
            if (!accountLogin) return res.status(200).json({
                status: false,
                field: "account",
                msg: "Tài khoản không tồn tại!"
            });
            let comparePassword = await bcrypt.compare(req.body.password, accountLogin.dataValues.password);
            if (!comparePassword) return res.status(200).json({
                status: false,
                field: "password",
                msg: "Mật khẩu không chính xác!"
            });
            let token = jwt.sign({accountId: accountLogin.dataValues.id || 0}, JSONConfig().secretKey, {
                expiresIn: "2m"
            });
            let refreshToken = jwt.sign({accountId: accountLogin.dataValues.id || 0}, JSONConfig().secretRefreshKey, {
                expiresIn: "30d"
            });
            await refreshTokenService.create({
                token: refreshToken,
                accountId: accountLogin.dataValues.id
            })
            res.cookie("Token", token, JSONConfig().cookie_options);
            return res.status(200).json({
                status: true,
                msg: "Đăng nhập thành công",
                accessToken: token,
                refreshToken: refreshToken,
                result: {
                    ...accountLogin.dataValues,
                    password: "Không công khai!"
                }
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({status: false, msg: "Đăng nhập thất bại!"});
        }
    },
    signup: async (req, res) => {
        try {
            if (!req.body) return res.status(400).json({status: false});
            if (!req.body.account || !checkAccount(req.body.account)) return res.status(200).json({
                status: false,
                field: "account",
                msg: "Tài khoản không đúng định dạng!"
            });
            if (await accountService.getOneByKey({account: req.body.account})) return res.status(200).json({
                status: false,
                field: "account",
                msg: "Tài khoản đã tồn tại!"
            });
            if (!req.body.password || !checkPassword(req.body.password)) return res.status(200).json({
                status: false,
                field: "password",
                msg: "Mật khẩu không đúng định dạng!"
            });
            req.body.password = await bcrypt.hash(req.body.password, 12);
            let result = await accountService.create({...req.body});
            if (!result) return res.status(400).json({status: false, msg: "Tạo tài khoản thất bại!"});
            return res.status(200).json({
                status: true,
                msg: "Tạo tài khoản thành công!",
                result: {
                    ...result?.dataValues,
                    password: "Không công khai!"
                }
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({status: false, msg: "Tạo tài khoản thất bại!"});
        }
    },
    logout: async (req, res) => {
        try {
            if (req.cookies && req.cookies.Token) {
                let decode = jwt.decode(req.cookies.Token);
                await refreshTokenService.delete({
                    accountId: decode.accountId
                });
                res.clearCookie("Token");
                return res.status(200).json({
                    status: true,
                    msg: "Đăng xuất thành công!",
                });
            } else {
                return res.status(400).json({
                    status: false,
                    msg: "Cần đăng nhập trước khi đăng xuất!",
                });
            }

        } catch (err) {
            console.log(err);
            return res.status(400).json({status: false, msg: "Đăng xuất thất bại!"});
        }
    },
    RefreshToken: async (req, res) => {
        try {
            let token = (req.body && req.body.token) || null;
            if (!token || typeof token !== "string") return res.status(400).json({status: false});
            jwt.verify(token, JSONConfig().secretRefreshKey, async (err, decode) => {
                if (err) {
                    await refreshTokenService.delete({
                        token: token
                    });
                    return res.status(400).json({status: false, msg: "Token không hợp lệ!"});
                }
                let tokenGetFromDB = await refreshTokenService.getOneByKey({
                    accountId: decode.accountId,
                    token: token
                });
                if (!tokenGetFromDB) return res.status(400).json({status: false, msg: "Token không hợp lệ!"});
                let newToken = await jwt.sign({accountId: decode.accountId || 0}, JSONConfig().secretKey, {
                    expiresIn: "2m"
                });
                res.cookie("Token", newToken, JSONConfig().cookie_options);
                return res.status(200).json({
                    status: true,
                    msg: "Cập nhật token thành công",
                    accessToken: newToken,
                    refreshToken: token,
                });
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({status: false, msg: "Cập nhật token thất bại!"});
        }
    }
}
