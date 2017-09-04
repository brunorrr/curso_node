/*
	Módulo responsável por gerenciar as funções de gerenciamento de notícias como formulários de inclusão
*/

module.exports = function(app){

	//Ouve chamada pelo método GET e carrega o formulário de inclusão de notícias
	app.get('/formulario_inclusao_noticia', function(req, res){
		//Chamando controlador do formulário
		app.app.controllers.admin.formulario_inclusao_noticia(app, req, res);
	});

	//Ouve uma chamada pelo método POST e insere a notícia enviada no BD
	app.post('/noticias/salvar', function(req, res){
		//Chamando controlador de salvamento
		app.app.controllers.admin.noticias_salvar(app, req, res);
	});
	
}