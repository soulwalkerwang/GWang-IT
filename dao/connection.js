/**
 * Created by gwang on 6/16/2016.
 */
var mysql = require('mysql');
var moment = require('moment-timezone');
var dataconfig = require('../dataconn.json');
var dateFormat = require('dateformat');
var db_config ={
    host:     dataconfig.host,
    user:     dataconfig.user,
    password: dataconfig.password,
    database: dataconfig.database
};
var db;
function handleDisconnect() {
    db = mysql.createConnection(db_config);

    db.connect(function(err) {
        if(err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    db.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

function Post(row) {
    this.postId =  row.id;
    this.publish_date = moment.tz(row.publish_date, "America/New_York").format("YYYY-MM-DD HH:mm:ss");
    this.title = row.title;
    this.author = row.author;
    this.meta_desc = row.meta_desc;
    this.meta_keywords = row.meta_keywords;
    this.body = row.body;
    this.icon = row.icon;
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


