var express = require('express');
var router = express.Router();
var conn = require('../dao/connection');

/* GET home page. */
router.get('/', function(req, res, next) {
  conn.getAllPosts(req,res, next);
});

router.get('/', function(req, res, next) {
  res.render('index', {allPosts : req.allposts});
});

module.exports = router;
