module.exports.cadastro = function(app,req,res){
	res.render('cadastro',{validacao:{}, dadosForm:{}});
}

module.exports.cadastrar = function(app,req,res){
	
	var dadosForm = req.body;

	req.assert('nome', 'O nome não pode ser vazio').notEmpty();
	req.assert('usuario', 'O usuario não pode ser vazio').notEmpty();
	req.assert('senha', 'A senha não pode ser vazia').notEmpty();
	req.assert('casa', 'Você deve selecionar uma casa').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.render('cadastro',{validacao:erros, dadosForm: dadosForm});
		return;
	}

	var connection = app.config.dbConnection;

	var usuariosDao = new app.app.models.usuariosDao(connection);

	usuariosDao.inserirUsuario(dadosForm);

	res.send('Usuário cadastrado');

}