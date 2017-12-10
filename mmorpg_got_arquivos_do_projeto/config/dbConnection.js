/* Importando o MongoDB */
var mongo = require('mongodb');
var configVar = require('./configVar.js');

//Encapsulando a função de conexão para que esta não seja chamada pelo consign
var connMongoDb = function(){
	//Instanciando a classe de conexão
	var db = new mongo.Db(
		'got',
		new mongo.Server(
			configVar.dbHost,//Endereço do servidor onde está o BD
			configVar.dbPort,//Porta de conexão
			configVar.dbParams//Parâmetros de conexão
		),
		{}
	);

	return db;
}

module.exports = function(){
	return connMongoDb;
}