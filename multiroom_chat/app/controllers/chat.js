module.exports.iniciarChat = function(app, req, res){

	var dadosForm = req.body;

	//Verificando se o nome é vazio
	req.assert('apelido','O nome ou apelido é obrigatório').notEmpty();

	//Verificando se o nome têm menos de 3 ou mais de 15 caracteres
	req.assert('apelido','O nome ou apelido deve ter entre 3 e 15 caracteres').len(3,15);

	var erros = req.validationErrors();

	if( erros ){
		res.render('index',{ validacao: erros });
		return;
	}

	res.render('chat');
}