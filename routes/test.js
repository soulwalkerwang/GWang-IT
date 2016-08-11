var express = require('express');
var router = express.Router();
var conn = require('../dao/connection');

/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.render('posts/template');
});
module.exports = router;
