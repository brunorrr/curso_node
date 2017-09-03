/*
	Rota da home do servidor
*/
module.exports = function(app){

	app.get('/', function(req, res){
		//Chamando o controlador da home
		app.app.controllers.home.index(app, req, res);
	});
}