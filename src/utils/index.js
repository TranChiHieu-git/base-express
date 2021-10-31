module.exports = {
    checkAccount: (account) => {
        if (typeof account !== "string") return false;
        let accountRegex = /^[a-zA-Z]{1}[a-zA-Z0-9_]{4,}/;
        if (!accountRegex.test(account)) return false;
        return true;
    },
    checkPassword: (password) => {
        if (typeof password !== "string") return false;
        let passwordRegex = /^[a-zA-Z0-9]{1}[a-zA-Z0-9\_\@\-\$\&]{5,}/;
        if (!passwordRegex.test(password)) return false;
        return true;
    }
}
