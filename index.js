var express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	colours = require('colors'),
	format = require('date-format');

var app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res) {
	res.send('Log Service');
});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log(colours.inverse(colours.green('Listening on ' + host + port)));
});

app.post('/log', function(req, res) {

	var type = req.body.type,
		message = req.body.message;

	res.send(logMsg(type, message));
});

app.get('/log', function(req, res) {

	var type = req.query.type,
		message = req.query.message;

	res.send(logMsg(type, message));
});

function logMsg(type, message) {

	message = colours.inverse(format(new Date())) + ' ' + unescape(message);

	switch(type) {
		case 'error':
			console.log(colours.red(message));
			break;

		case 'warn':
			console.log(colours.yellow(message));
			break;

		case 'info':
			console.log(colours.cyan(message));
			break;

		default:
			console.log(message);
	}

	return type + ': ' + message;
}