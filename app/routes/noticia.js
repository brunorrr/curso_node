module.exports = function(app){

	app.get('/noticia', function(req, res){

		var noticiaModel = app.app.models.NoticiasDAO(
				app.config.dbConnection());

		noticiaModel.getDetalheNoticia(function(erro, result){
			res.render('noticias/noticia', { noticia : result });
		});
	});

}