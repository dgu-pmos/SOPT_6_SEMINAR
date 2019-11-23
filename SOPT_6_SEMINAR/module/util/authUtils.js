// const jwt = require('../jwt-ext');
const jwt = require('../jwt');

const resMessage = require('./responseMessage');
const statusCode = require('./statusCode');
const util = require('./utils');

const authUtil = {
    LoggedIn: async(req, res, next) => {
        var token = req.headers.token;

        // 1. token 존재하는지 확인
        // 2. token 유효한지 확인
        // 3. token 페이로드에 유저 인덱스가 있는지
        
        if (!token) {   // 토큰이 헤더에 없을 경우
            return res.status(statusCode.BAD_REQUEST).json(util.successFalse(resMessage.EMPTY_TOKEN));
        } 
        // 토큰 확인
        const result = jwt.verify(token);

        if(result.isError){
            const {code, json} = result.data;
            if(code && json) {
                return res.status(code).send(util.successFalse(json));
            }
            const err = result.data;
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(err.message));
        }

        if(result == -3){
            return res.status(statusCode.UNAUTHORIZED).send(util.successFalse(resMessage.EXPIRED_TOKEN));
        }
        // const {userIdx} = result.data;
        if (result == -2){
            return res.status(statusCode.UNAUTHORIZED).send(util.successFalse(resMessage.INVALID_TOKEN));
        }
        req.decoded = result;
        next();
    }
};

module.exports = authUtil;