/**
 * Created by gwang on 6/16/2016.
 */
var mysql = require('mysql');

var db = mysql.createConnection({
    host:     '127.0.0.1',
    user:     'root',
    password: 'Ab521521',
    database: 'gwangit'
});

function Post(rows) {
    this.id =  rows[0].id;
    this.date = rows[0].date;
    this.title = rows[0].title;
    this.author = rows[0].author;
    this.body = rows[0].body;
}


exports.getPostByID = function(req, res, next) {
    var query = "SELECT * FROM post " +
        "WHERE id=? ";
    
    return db.query(
        query,
        [req.param('id')],
        function(err, rows) {
            if (err) throw err;
            if(rows.length <= 0){
                return next(new Error("Empty query"));
            }
            req.post = new Post(rows);
            return next();
        }
    );
};


