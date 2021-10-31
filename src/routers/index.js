const express = require('express');
const auth = require('./auth');
const no_auth = require('./no_auth');
const router = express.Router();

router.use('/auth', auth);
router.use('/', no_auth);
router.get('/*', (req, res) => {
    res.status(404).json({
        status: false,
        msg: "Không tìm thấy trang"
    })
});
module.exports = router;
