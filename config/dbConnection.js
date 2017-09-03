/*
	Script de configuração responsável pelo gerenciamento da conexão com o Banco de Dados
*/

//Chama módulo de conexão com Mysql
var mysql = require('mysql');

//Realiza a conexão com o Banco de Dados
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