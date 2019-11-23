var express = require('express');
var router = express.Router();

const defaultRes = require('../../module/util/utils');
const resMessage = require('../../module/util/responseMessage');
const statusCode = require('../../module/util/statusCode');
const db = require('../../module/pool');
const authUtil = require("../../module/util/authUtils");

// hotelIdx region image userIdx
// 숙소 조회
router.get('/hotel/users/:userIdx', async(req, res) => { // 숙소 조회
    const selectQuery ='SELECT * FROM hotel';
    const selectResult = await db.queryParam_None(selectQuery);

    if(!selectResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));    // DB ERROR(message)
        return ;
    };

    res.status(200).send(defaultRes.successTrue(statusCode.OK, "숙소 조회 성공", selectResult));  // 숙소 조회 성공
});


module.exports = router;
