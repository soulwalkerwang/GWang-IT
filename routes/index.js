var express = require('express');
var router = express.Router();
var conn = require('../dao/connection');
var fs = require('fs');
var contents = fs.readFileSync(__dirname +'/../sitemap.xml', 'utf8');
/* GET home page. */
router.get('/', function(req, res, next) {
  conn.getAllPosts(req,res, next);
});

router.get('/', function(req, res, next) {
  res.render('index', {allPosts : req.allposts});
});

router.get('/robots.txt', function(req, res, next) {
  res.type('text/plain');
  res.send("User-agent: *\nDisallow: ");
});

router.get('/sitemap.xml', function(req, res, next) {
  res.set('Content-Type', 'text/xml');
  res.send(contents);
});
module.exports = router;
