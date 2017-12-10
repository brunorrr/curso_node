function UsuariosDao(connection){
	this._connection = connection();
	console.log(this._connection.open);
}

UsuariosDao.prototype.inserirUsuario = function( usuario ){
	//Abrindo conexão com o BD
	this._connection.open(function(err, mongoClient){
		//Abrindo a coleção para a manipulação de documentos
		mongoClient.collection("usuarios", function(err, collection){
			//Manipulando a collection e inserindo o usuário no BD
			collection.insert(usuario);

			mongoClient.close();
		});
	});
}

module.exports = function(){
	return UsuariosDao;
}