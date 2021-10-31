const jwt = require("jsonwebtoken");
const JSONConfig = require("../configs");
const {getOneByKey} = require("../repositories/accounts.repository")

function Authorization(req, res, next, role = []) {
    if (role.length <= 0) return next();
    if (!req.cookies || !req.cookies.Token) return next();
    jwt.verify(req.cookies.Token, JSONConfig().secretKey, async (err, decode) => {
        if (err) return next();
        let account = JSON.parse(JSON.stringify(await getOneByKey({
            id: decode.accountId
        })));
        if (!account) return next();
        if (account.roles && account.roles.length > 0) {
            let flag = false;
            account.roles.map(x => {
                if (role.find(element => element === x.name)) {
                    flag = true;
                }
            });
            if (flag) return next();
            return res.status(403).json({
                status: false,
                msg: "Không có quyền truy cập!"
            });
        } else {
            return res.status(403).json({
                status: false,
                msg: "Không có quyền truy cập!"
            })
        }
    });
}

module.exports = Authorization;
