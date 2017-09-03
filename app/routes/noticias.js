module.exports = function(app){

	app.get('/noticias', function(req, res){

		var noticiasModel = new app.app.models.NoticiasDAO(
				app.config.dbConnection());

		noticiasModel.getNoticias(function(erro, result){
			res.render('noticias/noticias', { noticias : result });
		});
	});

}