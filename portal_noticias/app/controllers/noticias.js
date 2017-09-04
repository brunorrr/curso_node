module.exports.noticias = function(app, req, res){
	var noticiasModel = new app.app.models.NoticiasDAO(
			app.config.dbConnection());

	noticiasModel.getNoticias(function(erro, result){
		res.render('noticias/noticias', { noticias : result });
	});
}

module.exports.noticia = function(app, req, res){
	var noticiaModel = new app.app.models.NoticiasDAO(
			app.config.dbConnection());

	//Obtendo variáveis da query da requisição
	var id_noticia = req.query.id_noticias;

	noticiaModel.getDetalheNoticia(id_noticia, function(erro, result){
		res.render('noticias/noticia', { noticia : result });
	});
}