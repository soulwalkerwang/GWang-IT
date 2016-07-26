/**
 * Created by gwang on 6/16/2016.
 */
var mysql = require('mysql');
var dataconfig = require('../dataconn.json');
var db_config ={
    host:     dataconfig.host,
    user:     dataconfig.user,
    password: dataconfig.password,
    database: dataconfig.database
};
var db;
function handleDisconnect() {
    db = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.
    db.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    db.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();

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


