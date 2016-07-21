var express = require('express');
var router = express.Router();
var conn = require('../dao/connection');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  conn.getPostByID(req,res, next);
});
router.get('/:id', function(req, res, next) {
  res.render('posts/post1', {postId: req.param('id'),title : req.post.title});
});

module.exports = router;
