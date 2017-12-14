module.exports.index = function(app,req,res){
	res.render('index',{validacao:{}});
}

module.exports.autenticar = function(app,req,res){

	var dadosForm = req.body;

	req.assert('usuario', 'Você deve preencher o campo usuário').notEmpty();
	req.assert('senha', 'Você deve preencher o campo senha').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.render('index',{validacao:erros});
		return;
	}

	res.render('index');
}