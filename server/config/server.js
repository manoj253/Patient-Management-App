var express = require('express'),
	morgan = require('morgan'),
	path = require('path'),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	helmet = require('helmet'),
	config = require('./config'),
	mongoose = require('mongoose'),
	cors = require('cors');
var dev = require('../config/env/dev');
mongoose.connect('mongodb://' + dev.mongo.host + '/' + dev.mongo.db);
module.exports = function() {
	var app = express();
	app.use(cors());
	app.set('showStackError', true);

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	}

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json())
	app.use(cookieParser());
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.use(helmet.ienoopen());
	app.disable('x-powered-by');

	require(path.resolve('./server/routes.js'))(app);

	// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();
    console.error(err.stack);
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({status: false,
        err: 'The supplied authentication is not authorized to access this resource'});
    }
		else res.status(500).send({status: false, err: 'Internal server error!'});
	});

	app.use(express.static(path.join(__dirname, '../../public')));
	// Assume 404 since no middleware responded
	// Set view path
	app.set('views', path.join(__dirname, '../views'));

	app.use(function(req, res) {
		res.status(404).send('404', {
      status: false,
			url: req.originalUrl,
			err: 'Not Found'
		});
	});
	return app;
};
