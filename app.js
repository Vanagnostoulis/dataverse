var express = require('express'); 
var app = express();
var bodyParser = require('body-parser'); 
var session = require('express-session');
var db = require('./models/db.js');
const cookieParser = require('cookie-parser');
var router = express.Router(); 

app.set('view engine', 'ejs');
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({
  extended: true
}));

if(global.SQLpool === undefined){
	global.SQLpool = db.createPool(); //create a global sql pool connection
}

/* Connect to mysql */
app.use(cookieParser());

app.use(session({
    key: 'user',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use(require('./controllers/index.js'));
app.use(require('./controllers/users.js'));

app.listen('3000', function(){
	console.log("Connected on port 3000.");
});