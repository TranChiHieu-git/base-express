const accountService = require("../services/account.service")
const getOneByKey = (req, res) => {
    return accountService.getOneByKey(req, res);
}
const getOneById = (req, res) => {
    return accountService.getOneById(req, res);
}
const getAllByKey = (req, res) => {
    return accountService.getAllByKey(req, res);
}
const update = (req, res) => {
}
const destroy = (req, res) => {

}

module.exports = {getOneByKey, getAllByKey, getOneById, update, destroy}
