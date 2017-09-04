var http = require('http');

var server = http.createServer( function( req, res ){

	console.log( req );
	res.end('<html><body><h1>Hello World!</h1></body></html>');
});

server.listen(3000);