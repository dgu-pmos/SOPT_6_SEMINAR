var express = require('express');
var router = express.Router();

router.use('/hotel', require("./hotel"))
router.use('/play', require("./play"))
router.use('/adventure', require("./adventure"))
router.use('/food', require("./food"))

module.exports = router;
