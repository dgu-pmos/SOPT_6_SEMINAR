var express = require('express');
var router = express.Router();

router.use("/main", require("./main/index"));
router.use('/auth', require("./auth/index"))
router.use('/chat', require("./chat/index"))

module.exports = router;
