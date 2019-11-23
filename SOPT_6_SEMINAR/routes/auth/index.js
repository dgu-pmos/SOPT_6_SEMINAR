var express = require('express');
var router = express.Router();

router.use("/signin", require("./signin"));  // 로그인
router.use("/signup", require("./signup"));  // 회원가입

module.exports = router;