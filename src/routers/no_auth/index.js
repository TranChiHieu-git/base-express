const express = require('express');
const {Login, Signup, Logout, RefreshToken, getAccountById} = require("../../controllers/authentication.controller");
const router = express.Router();

router.post('/login', Login);
router.post('/signup', Signup);
router.get('/logout', Logout);
router.post('/refreshtoken', RefreshToken);
router.get('/account', getAccountById);

module.exports = router;
