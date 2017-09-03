module.exports = function(app){

	app.get('/noticia', function(req, res){

		var con = app.config.dbConnection();
		var noticiaModel = app.app.models.noticiasModel;

		noticiaModel.getDetalheNoticia(con, function(erro, result){
			res.render('noticias/noticia', { noticia : result });
		});
	});

}