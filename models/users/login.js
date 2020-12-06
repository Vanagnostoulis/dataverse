var mysql = require("../db.js"),
    mysqlPool = mysql.createPool();

var login = function(){};

login.prototype.getCredentials = function(req, res, callback){
    var params = [req.session.user],
        getDetailQuery = 'SELECT Name, LastName, Email, Phone, Company FROM Users WHERE Personid  = ?';
        mysqlPool.getConnection(function(err, connection){
        connection.query(getDetailQuery, params, function(err, rows, fields) {
            if(rows.length <= 0){ 
                console.log("problem getting getting credentials");
                connection.release()    ;
                callback(true, null);
            }else{
                console.log("user authenticated");
                connection.release();
                callback(null, rows[0]);
            }
        });
    });
}

login.prototype.loginUser = function(req, res, callback){
    var params = [req.body.email, req.body.password],
        detailParams = [],
        loginUserQuery = 'SELECT * FROM Users WHERE Email = ? AND Password = ?',
        getDetailQuery = 'SELECT Name, LastName, Email, Phone, Company FROM Users WHERE Personid  = ?';
        console.log("user Login")
    mysqlPool.getConnection(function(err, connection){
        connection.query(loginUserQuery, params, function(err, rows, fields) {
            // cant connect
            if(rows.length <= 0){ 
                connection.release();
                callback(true, null);
            }else{
                detailParams = [rows[0].Personid];
                req.session.user = rows[0].Personid;
                req.cookies.user = rows[0].Personid;
                console.log(detailParams)
                connection.query(getDetailQuery, detailParams, function(err, rows, fields) {
                    connection.release();
                    console.log("got credentials from database after login");
                    callback(null, rows[0]);
                });
            }
        });
    });
}

module.exports = new login();