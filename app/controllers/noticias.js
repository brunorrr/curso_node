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

	noticiaModel.getDetalheNoticia(function(erro, result){
		res.render('noticias/noticia', { noticia : result });
	});
}