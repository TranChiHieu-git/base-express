const express = require('express');
const {getOneByKey, getOneById} = require("../../controllers/account.controller");
const router = express.Router();

router.get('/findonebykey', getOneByKey);
router.get('/findonebyid/:id', getOneById);

module.exports = router;
