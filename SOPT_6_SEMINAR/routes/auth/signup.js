var express = require('express');
var router = express.Router();

const crypto = require('crypto-promise');

const defaultRes = require('../../module/util/utils');
const statusCode = require('../../module/util/statusCode');
const resMessage = require('../../module/util/responseMessage')
const db = require('../../module/pool');

// 회원가입
// userIdx id pwd name
router.post('/', async (req, res) => {
    let id = req.body.id;
    let pwd = req.body.pwd;
    let name = req.body.name;

    if(!id || !pwd || !name){   // null input 
        res.status(400).send(defaultRes.successFalse(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));    // 필요한 값이 없습니다.
        return ;
    }

    const selectQuery = 'SELECT * FROM user WHERE id = ?'
    const selectResult = await db.queryParam_Arr(selectQuery, [id]);

    if(!selectResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));    // DB ERROR
        return ;
    }

    if(selectResult.length != 0){   // 유저가 있는 경우
        res.status(400).send(defaultRes.successFalse(statusCode.BAD_REQUEST, resMessage.ALREADY_USER_SIGNUP));    // 필요한 값이 없습니다.
        return ;
    }

    const signupQuery = 'INSERT INTO user (id, pwd, name, salt) VALUES (?, ?, ?, ?)';

    const random = await crypto.randomBytes(64);
    const salt = random.toString('base64');
    const hashedPwd = await crypto.pbkdf2(pwd.toString(), salt, 1000, 32, 'SHA512');

    const signupResult = await db.queryParam_Arr(signupQuery, [id, hashedPwd.toString('base64'), name, salt]);

    if(!signupResult){  // insert 실패
        res.status(200).send(defaultRes.successFalse(statusCode.OK, resMessage.FAIL_USER_SIGNUP));  // 유저 회원가입 실패
        return ;
    }
        res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.SUCCESS_USER_SIGNUP, "성공"));    // 유저 회원가입 성공
});

module.exports = router;