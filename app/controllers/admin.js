module.exports.formulario_inclusao_noticia = function(app, req, res){
	//Envia-se as variáveis de validação e erro vazias para não causar erro na renderização inicial
	res.render('admin/form_add_noticia', {validacao: {}, noticia: {}});
}

module.exports.noticias_salvar = function(app, req, res){
	var noticia = req.body;

	req.assert('titulo','O título é obrigatório').notEmpty();
	req.assert('resumo','O resumo é obrigatório').notEmpty();
	req.assert('resumo','O resumo deve conter entre 10 e 100 caracteres').len(10,100);
	req.assert('autor','O nome do autor é obrigatório').notEmpty();
	req.assert('autor','O nome do autor não deve ter mais que 30 caracteres').len(1,30);
//	isDate pode esta depreciado, somente funciona com a versão do express-validator definida para ^3.2.1
	req.assert('data_noticia','Data inválida').notEmpty().isDate({format:'YYYY-MM-DD'});
	req.assert('autor','A notícia é obrigatória').notEmpty();

	var erros = req.validationErrors();

	//Se a variável erros for definida(quando há erros), renderizar o formulário informando os erros
	if( erros ){
		//Envia-se a notícia para o formulário para mante-lo preenchido para a correção
		res.render('admin/form_add_noticia', {validacao: erros, noticia: noticia});
		return;
	}

	var noticiasModel = new app.app.models.NoticiasDAO(
			app.config.dbConnection());

	//Salvando informação
	noticiasModel.salvarNoticia(noticia, function(erro, result){
		//Retorna status 302 redirecionando para /noticias
		res.redirect('/noticias');
	});
}