var mysql =	require("../db.js"),
	mysqlPool = mysql.createPool(); // connects to Database

 var signup = function(){};

 signup.prototype.addUser = function(req, res, callback){
    var existparams   = [req.body.email],
        existQuery    = 'SELECT * FROM Users WHERE EMAIL = ? ',
        insertparams  = [req.body.fname, req.body.lname, req.body.email, req.body.pass_reg, req.body.phone, req.body.company],
        insertQuery   = 'INSERT INTO Users (Name,LastName,Email,Password, Phone, Company) VALUES (?,?,?,?,?,?)';

    mysqlPool.getConnection(function(err, connection){
      connection.query(existQuery, existparams, function(err, rows, fields) {
        // user does not exist so insert him
        if(rows.length <= 0){
            connection.query(insertQuery, insertparams, function(err, rows, fields) {
                if(err){
                    req.session.error = 'Internal error happened. Try again';
                    connection.release();
                    callback(true, null);
                }else{
                    req.session.error = 'User added to database';
                    connection.release();
                    callback(null, true);       
                }
            });
        }else{
            // exists tell him to log in
            req.session.error = 'Email exists log in';
            connection.release();
            res.redirect('/login');
        }
    });
  });
}

module.exports = new signup();