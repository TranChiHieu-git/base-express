const authentication = require("../services/authentication.service");

const Login = (req, res) => {
    return authentication.login(req, res);
}
const Signup = (req, res) => {
    return authentication.signup(req, res);
}
const Logout = (req, res) => {
    return authentication.logout(req, res);
}
const RefreshToken = (req, res) => {
    return authentication.RefreshToken(req, res);
}
const getAccountById = (req, res) => {
    return authentication.getAccountById(req, res);
}

module.exports = {Login, Signup, Logout, RefreshToken, getAccountById};
