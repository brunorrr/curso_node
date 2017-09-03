/*
	Módulo responsável por gerenciar as funções de gerenciamento de notícias como formulários de inclusão
*/

module.exports = function(app){

	//Ouve chamada pelo método GET e carrega o formulário de inclusão de notícias
	app.get('/formulario_inclusao_noticia', function(req, res){
		res.render('admin/form_add_noticia');
	});

	//Ouve uma chamada pelo método POST e insere a notícia enviada no BD
	app.post('/noticias/salvar', function(req, res){
		var noticia = req.body;

		var noticiasModel = new app.app.models.NoticiasDAO(
				app.config.dbConnection());

		//Sanvando informação
		noticiasModel.salvarNoticia(noticia, function(erro, result){
			//Retorna status 302 redirecionando para /noticias
			res.redirect('/noticias');
		});
	});
	
}