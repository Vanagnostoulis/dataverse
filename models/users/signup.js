var mysql =	require("../db.js"),
	mysqlPool = mysql.createPool(); // connects to Database
/**
 * Defines Signup operations.
 * @class
 */
 var signup = function(){};

/**
 * save user data 
 * @Function
 * @param callback
 * @param feedbackQuery
 */
 signup.prototype.addUser = function(req, res, callback){
    var nowDate = new Date().toISOString().slice(0, 19).replace('T', ' '),
    params = [req.body.fname, req.body.lname, req.body.email, req.body.pass_reg, req.body.phone, req.body.company],
    feedbackQuery = 'INSERT INTO Users (Name,LastName,Email,Password, Phone, Company) VALUES (?,?,?,?,?,?)';
    mysqlPool.getConnection(function(err, connection){
      connection.query(feedbackQuery, params, function(err, rows, fields) {
        if(err){
            console.log(feedbackQuery)
            console.log(err)
            console.log(rows)
            console.log(fields)

            connection.release();
            callback(true, null);
        }else{
            connection.release();
            callback(null, true);       
        }
    });
  });
}

module.exports = new signup();