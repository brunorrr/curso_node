/*
	Módulo responsável por gerenciar as funções de gerenciamento de notícias como formulários de inclusão
*/

module.exports = function(app){

	//Ouve chamada pelo método GET e carrega o formulário de inclusão de notícias
	app.get('/formulario_inclusao_noticia', function(req, res){
		res.render('admin/form_add_noticia', {validacao: {}});
		res.render('admin/form_add_noticia');
	});

	//Ouve uma chamada pelo método POST e insere a notícia enviada no BD
	app.post('/noticias/salvar', function(req, res){
		var noticia = req.body;

		req.assert('titulo','O título é obrigatório').notEmpty();
		req.assert('resumo','O resumo é obrigatório').notEmpty();
		req.assert('resumo','O resumo deve conter entre 10 e 100 caracteres').len(10,100);
		req.assert('autor','O nome do autor é obrigatório').notEmpty();
		req.assert('autor','O nome do autor não deve ter mais que 30 caracteres').len(1,30);
		req.assert('data_noticia','Data inválida').notEmpty();
//		isDate pode esta depreciado, somente funciona com a versão do express-validator definida para ^3.2.1
		req.assert('data_noticia','Data inválida').isDate({format:'YYYY-MM-DD'});
		req.assert('autor','A notícia é obrigatória').notEmpty();

		var erros = req.validationErrors();

		if( erros ){
			res.render('admin/form_add_noticia', {validacao: erros});
			return;
		}

		var noticiasModel = new app.app.models.NoticiasDAO(
				app.config.dbConnection());

		//Sanvando informação
		noticiasModel.salvarNoticia(noticia, function(erro, result){
			//Retorna status 302 redirecionando para /noticias
			res.redirect('/noticias');
		});
	});
	
}