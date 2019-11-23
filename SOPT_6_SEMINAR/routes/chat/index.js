var express = require('express');
var router = express.Router();

const defaultRes = require('../../../../module/util/utils');
const resMessage = require('../../../../module/util/responseMessage');
const statusCode = require('../../../../module/util/statusCode');
const db = require('../../../../module/pool');
const authUtil = require("../../../../module/util/authUtils");

router.get('/', async(req, res) => {
});

module.exports = router;