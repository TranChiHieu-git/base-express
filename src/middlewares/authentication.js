const jwt = require('jsonwebtoken');
const JSONConfig = require('../configs');
const {getOneByKey} = require("../repositories/accounts.repository");

function Authentication(req, res, next) {
    const regexAuthPathname = /^\/auth\/*/;
    if (req.url === "/auth" || regexAuthPathname.test(req.url)) {
        if (req.cookies && req.cookies.Token) {
            jwt.verify(req.cookies.Token, JSONConfig().secretKey, async (err, decode) => {
                if (err) {
                    return res.status(401).json({
                        status: false,
                        msg: "Cần đăng nhập để truy cập!"
                    });
                }
                let account = await getOneByKey({
                    id: decode.accountId
                });
                if (!account || !account.dataValues) return res.status(401).json({
                    status: false,
                    msg: "Cần đăng nhập để truy cập!"
                });
                return next();
            })
        } else {
            return res.status(401).json({
                status: false,
                msg: "Cần đăng nhập để truy cập!"
            });
        }
    } else {
        return next();
    }
}

module.exports = Authentication;
