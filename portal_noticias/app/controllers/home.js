module.exports.index = function( app, req, res ){

	//Instanciando a noticia
	var noticiasModel = new app.app.models.NoticiasDAO(
			app.config.dbConnection());

	noticiasModel.getNoticias(function( error, result ){
		res.render('home/index',{noticias: result });
	}, 5);
}