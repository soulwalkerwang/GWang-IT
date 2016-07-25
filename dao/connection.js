/**
 * Created by gwang on 6/16/2016.
 */
var mysql = require('mysql');
var dataconfig = require('../dataconn.json');
var db = mysql.createConnection({
    host:     dataconfig.host,
    user:     dataconfig.user,
    password: dataconfig.password,
    database: dataconfig.database
});

function Post(row) {
    this.postId =  row.id;
    this.publish_date = row.publish_date;
    this.title = row.title;
    this.author = row.author;
    this.body = row.body;
    
}


exports.getPostByID = function(req, res, next) {
    var query = "SELECT * FROM post " +
        "WHERE id=? ";
    
    return db.query(
        query,
        [req.params.id],
        function(err, rows) {
            if (err) throw err;
            if(rows.length <= 0){
                return next(new Error("Empty query"));
            }
            req.post = new Post(rows[0]);
            return next();
        }
    );
};

exports.getAllPosts = function(req, res, next) {
    var query = "SELECT * FROM post";

    return db.query(
        query,
        [],
        function(err, rows) {
            if (err) throw err;
            if(rows.length <= 0){
                return next(new Error("Empty query"));
            }else {
                req.allposts = new Array(rows.length);
                for (var i = 0; i < rows.length; i++){
                    req.allposts[i] = new Post(rows[i]);
                }
            }

            return next();
        }
    );
};


