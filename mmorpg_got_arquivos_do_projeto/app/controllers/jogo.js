module.exports.jogo = function(app,req,res){

	if(req.session.autorizado !== true){
		res.send('O usuário precisa fazer o login para acessar esta página.');
		return;
	}



	var connection = app.config.dbConnection;

	var jogoDao = new app.app.models.jogoDao(connection);

	jogoDao.iniciarJogo(res, req.session.usuario, req.session.casa, req.query.msg);
}

module.exports.sair = function(app,req,res){

	req.session.destroy(function(err){
		res.render('index',{validacao:{}});
	});
}

module.exports.suditos = function(app,req,res){

	if(req.session.autorizado !== true){
		res.send('O usuário precisa fazer o login para acessar esta página.');
		return;
	}

	res.render('aldeoes',{validacao:{}});
}

module.exports.pergaminhos = function(app,req,res){

	if(req.session.autorizado !== true){
		res.send('O usuário precisa fazer o login para acessar esta página.');
		return;
	}

	//Recuperando as ações inseridas no Banco de Dados
	var jogoDao = new app.app.models.jogoDao(
			app.config.dbConnection);

	jogoDao.getAcoes(req.session.usuario, res);
}

module.exports.ordenar_acao_sudito = function(app,req,res){

	if(req.session.autorizado !== true){
		res.send('O usuário precisa fazer o login para acessar esta página.');
		return;
	}

	var dadosForm = req.body;

	req.assert('acao','A ação deve ser informada').notEmpty();
	req.assert('quantidade','A quantidade deve ser informada').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.redirect('jogo?msg=E');
		return;
	}

	dadosForm.usuario = req.session.usuario;

	var jogoDao = new app.app.models.jogoDao(
			app.config.dbConnection);

	jogoDao.acao(dadosForm);

	res.redirect('jogo?msg=S');
}

module.exports.revogar_acao = function(app,req,res){
	var urlQuery = req.query;

	var jogoDao = new app.app.models.jogoDao(
			app.config.dbConnection);

	jogoDao.revogarAcao(req.query.id_acao, res);
}