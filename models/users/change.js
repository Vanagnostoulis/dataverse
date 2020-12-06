var mysql = require("../db.js"),
    mysqlPool = mysql.createPool();

var change = function(){};

change.prototype.changePass = function(req, res, callback){
    var params = [req.body.pass_reg, req.session.user],
        updateQuery = 'UPDATE Users SET Password = ?  WHERE Personid  = ?';
        mysqlPool.getConnection(function(err, connection){
        connection.query(updateQuery, params, function(err, rows, fields) {
            if(err){ 
                connection.release();
                callback(true, null);
            }else{
                callback(null, true);
            }
        });
    });
}

module.exports = new change(); 