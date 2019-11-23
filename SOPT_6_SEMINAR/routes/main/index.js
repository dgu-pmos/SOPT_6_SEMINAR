var express = require('express');
var router = express.Router();

router.use('/hotel',require('./hotel'));
//router.use('/play',require('./play'));
//router.use('/adventure',require('./adventure'));
//router.use('/food',require('./food'));

router.post('/', (req, res) => {
    res.send('multerTest index');
});

module.exports = router;
