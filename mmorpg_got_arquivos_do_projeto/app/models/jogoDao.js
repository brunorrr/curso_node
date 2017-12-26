function JogoDao(connection){
	this._connection = connection();
	console.log(this._connection.open);
}

JogoDao.prototype.gerarParametros = function(usuario){
	//Abrindo conexão com o BD
	this._connection.open(function(err, mongoClient){
		//Abrindo a coleção para a manipulação de documentos
		mongoClient.collection("jogo", function(err, collection){
			//Manipulando a collection e inserindo o usuário no BD
			collection.insert({
				usuario: usuario,
				moeda:15,
				suditos: 10,
				temor: Math.floor(Math.random() * 1000),
				sabedoria: Math.floor(Math.random() * 1000),
				comercio: Math.floor(Math.random() * 1000),
				magia: Math.floor(Math.random() * 1000)
			});

			mongoClient.close();
		});
	});
}

JogoDao.prototype.iniciarJogo = function(res,usuario, casa){
	//Abrindo conexão com o BD
	this._connection.open(function(err, mongoClient){
		//Abrindo a coleção para a manipulação de documentos
		mongoClient.collection("jogo", function(err, collection){
			//Procurando na collection um usuário que esteja cadastrado
			collection.find({usuario: usuario}).toArray(function(err,result){
				
				res.render('jogo',{img_casa: casa, jogo:result[0]});
			});
		});
	});
}

module.exports = function(){
	return JogoDao;
}