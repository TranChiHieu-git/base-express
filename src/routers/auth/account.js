const express = require('express');
const {getOneByKey, getOneById, getAllByKey} = require("../../controllers/account.controller");
const router = express.Router();

router.get('/findallbykey', getAllByKey);
router.get('/findonebykey', getOneByKey);
router.get('/findonebyid/:id', getOneById);

module.exports = router;
