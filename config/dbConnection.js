var mysql = require('mysql');

var funcConexao = function(){
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		database: 'portal_noticias'
	});

	return connection;
}

module.exports = function(){
	return funcConexao;
}