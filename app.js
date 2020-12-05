var express = require('express'); 
var app = express();
var bodyParser = require('body-parser'); 
var session = require('express-session');
var db = require('./models/db.js');
var router = express.Router(); 

app.set('view engine', 'ejs');
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({
  extended: true
}));

if(global.SQLpool === undefined){
	global.SQLpool = db.createPool(); //create a global sql pool connection
}

app.use(require('./controllers/index.js'));
app.use(require('./controllers/users.js'));

app.listen('3000', function(){
	console.log("Connected on port 3000.");
});