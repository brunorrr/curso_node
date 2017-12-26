module.exports.jogo = function(app,req,res){

	if(req.session.autorizado !== true){
		res.send('O usuário precisa fazer o login para acessar esta página.');
		return;
	}

	var connection = app.config.dbConnection;

	var jogoDao = new app.app.models.jogoDao(connection);

	jogoDao.iniciarJogo(res, req.session.usuario, req.session.casa);
}

module.exports.sair = function(app,req,res){

	req.session.destroy(function(err){
		res.render('index',{validacao:{}});
	});
}