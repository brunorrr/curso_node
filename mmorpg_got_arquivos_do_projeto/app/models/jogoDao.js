function JogoDao(connection){
	this._connection = connection();
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

JogoDao.prototype.iniciarJogo = function(res,usuario, casa, msg){
	//Abrindo conexão com o BD
	this._connection.open(function(err, mongoClient){
		//Abrindo a coleção para a manipulação de documentos
		mongoClient.collection("jogo", function(err, collection){
			//Procurando na collection um usuário que esteja cadastrado
			collection.find({usuario: usuario}).toArray(function(err,result){
				
				res.render('jogo',{img_casa: casa, jogo:result[0], msg: msg});
			});
		});
	});
}

JogoDao.prototype.acao = function(acao){
	//Abrindo conexão com o BD
	this._connection.open(function(err, mongoClient){
		//Abrindo a coleção para a manipulação de documentos
		mongoClient.collection("acao", function(err, collection){

			var tempo = 0;

			//Verificando pelas ações qual é o tempo de execução de cada uma
			switch( parseInt(acao.acao) ){
				case 1: tempo = 3600000; break;
				case 2: tempo = 1 * 3600000; break;
				case 3: tempo = 3 * 3600000; break;
				case 4: tempo = 5 * 3600000; break;
			}

			var date = new Date();
			acao.acaoTerminaEm = date.getTime() + tempo;

			collection.insert(acao);

			mongoClient.close();
		});
	});
}

JogoDao.prototype.getAcoes = function(usuario,res){
	//Abrindo conexão com o BD
	this._connection.open(function(err, mongoClient){
		//Abrindo a coleção para a manipulação de documentos
		mongoClient.collection("acao", function(err, collection){
			var momentoAtual = new Date().getTime();

			//Procurando na collection um usuário que esteja cadastrado e com uma ação futura
			collection.find({usuario: usuario, acaoTerminaEm: { $gt: momentoAtual } }).toArray(function(err,result){
				
				mongoClient.close();

				res.render('pergaminhos', {acoes: result});
			});
		});
	});
}

module.exports = function(){
	return JogoDao;
}