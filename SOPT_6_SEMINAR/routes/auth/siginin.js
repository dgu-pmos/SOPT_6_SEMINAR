var express = require('express');
var router = express.Router();

const crypto = require('crypto-promise');

const defaultRes = require('../../module/util/utils');
const statusCode = require('../../module/util/statusCode');
const resMessage = require('../../module/util/responseMessage');
const db = require('../../module/pool');
const jwt = require('../../module/jwt');

// 로그인
router.post('/', async (req, res) => {
    let id = req.body.id;
    let pwd = req.body.pwd;

    if(!id || !pwd){   // null input 
        res.status(400).send(defaultRes.successFalse(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));    // 필요한 값이 없습니다.
        return ;
    }

    const selectQuery = 'SELECT * FROM user WHERE id = ?'
    const selectResult = await db.queryParam_Arr(selectQuery, [id]);

    if(!selectResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));    // DB ERROR
        return ;
    }

    if(selectResult.length == 0){   // 유저가 없는 경우
        res.status(400).send(defaultRes.successFalse(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));    // 필요한 값이 없습니다.
        return ;
    }

    const salt = selectResult[0].salt;  // 유저의 솔트값
    const hashedInputPwd = await crypto.pbkdf2(pwd.toString(), salt, 1000, 32, 'SHA512');   // 입력한 패스워드의 해쉬된 패스워드

    if(selectResult[0].pwd != hashedInputPwd.toString('base64')){   // 패스워드가 일치하지 않을 경우
        res.status(400).send(defaultRes.successFalse(statusCode.BAD_REQUEST, resMessage.NOT_CORRECT_PASSWORD));
        return ;
    }

    const token = jwt.sign(selectResult[0]);
    res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.SUCCESS_USER_SIGNIN, token));
});

module.exports = router;