var mysql = require("../db.js"),
    mysqlPool = mysql.createPool();

var login = function(){};

login.prototype.loginUser = function(req, res, callback){
    var params = [req.body.email, req.body.password],
        detailParams = [],
        loginUserQuery = 'SELECT * FROM Users WHERE Email = ? AND Password = ?',
        getDetailQuery = 'SELECT Name, LastName, Email, Phone, Company FROM Users WHERE Personid  = ?';
        console.log("LOGIN")

    mysqlPool.getConnection(function(err, connection){
        connection.query(loginUserQuery, params, function(err, rows, fields) {
            // cant connect
            console.log("first query existance")

            if(rows.length <= 0){ 
                console.log("prob");
                connection.release();
                callback(true, null);
            }else{
                console.log("HERE");
                detailParams = [rows[0].Personid];
                req.session.user = rows[0];
                console.log("user exists")
                console.log(detailParams)
                connection.query(getDetailQuery, detailParams, function(err, rows, fields) {
                    console.log("\n\n\nCHECK ME !!!!!!!!!!!!11\n\n");
                    connection.release();
                    callback(null, rows[0]);
                });
            }
        });
    });
}

module.exports = new login();