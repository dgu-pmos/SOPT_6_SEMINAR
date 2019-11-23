const express = require('express');
const router = express.Router({
    mergeParams: true
});
const statusCode = require('../../module/statusCode');
const responseMessage = require('../../module/responseMessage');
const authUtil = require('../../module/authUtil');
const Article = require('../../../model/Hotel');

const THIS_LOG = '글';

router.get('/:userIdx', async (req, res) => {
    const { blogIdx, articleIdx } = req.params;
    if(!blogIdx || !articleIdx){
        const missParameters = Object.entries({name, url})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = { blogIdx, articleIdx };
    result = await Article.read(json);
    if(!result)
    {
        res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        return;
    }
    res
    .status(statusCode.OK)
    .send(authUtil.successTrue(responseMessage.X_READ_SUCCESS(THIS_LOG),result));
});

module.exports = router;
