function UsuariosDao(connection){
	this._connection = connection();
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

UsuariosDao.prototype.autenticar = function(usuario,req,res){
	//Abrindo conexão com o BD
	this._connection.open(function(err, mongoClient){
		//Abrindo a coleção para a manipulação de documentos
		mongoClient.collection("usuarios", function(err, collection){
			//Procurando na collection um usuário que esteja cadastrado
			collection.find({usuario: usuario.usuario, senha: usuario.senha}).toArray(function(err,result){
				if(result[0] != undefined){
					//Definindo na sessão que o usuário está autorizado a acessar as páginas restritas
					req.session.autorizado = true;

					req.session.usuario = result[0].usuario;
					req.session.casa = result[0].casa;

					res.redirect('jogo');
				}
				else{
					req.session.autorizado = false;	
					res.render('index',{validacao:{}});
				}

				mongoClient.close();

			});
		});
	});
}

module.exports = function(){
	return UsuariosDao;
}