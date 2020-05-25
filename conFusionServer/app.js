var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var FileStore = require('session-file-store')(session);

const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var leaderRouter = require('./routes/leaderRouter');
var promoRouter = require('./routes/promoRouter');
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');

const mongoose = require('mongoose');
const Dishes = require('./models/dishes');


const url = config.mongoUrl;
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
connect.then(db => {
	console.log('Connected correctly to server');
}, err => console.log(err));




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(cookieParser('12345-67890-09876-54321')); removed because not used

/* removed because not used 
app.use(session({
	name: 'session-id',
	secret: '12345-67890-09876-54321',
	saveUninitialized: false,
	resave: false,
	store: new FileStore()
}));
*/


app.use(passport.initialize());
//app.use(passport.session()); removed as not used




app.use('/', indexRouter);
app.use('/users', usersRouter);

/*
const auth = (req, res, next) => {
	if(!req.user) {
		var err = new Error('You are not authenticated.');
		err.status = 403;

		return next(err);
	} else {
		next();
	}
}
*/



/*
const auth = (req, res, next) => {
	
	//console.log(req.headers);
	//console.log(req.signedCookies);
	console.log(req.session);

	var authHeader = req.headers.authorization;
	
	// case when cookie.user doesnt not exist if(!req.signedCookies.user)
	if(!req.session.user) {
		var err = new Error('You are not authenticated.');
			
		err.status = 403;

		return next(err);
	} else {
		if(req.session.user === 'authenticated') {
			next();
		} else {
			var err = new Error('You are not authenticated.');
			err.status = 403;

			return next(err);
		}
	}
	
}
*/
//app.use(auth);


app.use(express.static(path.join(__dirname, 'public')));



app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
