module.exports = function(application){
	application.get('/', function(req, res){
		res.format({
			html: function(){
				res.send('Bem vindo a sua app NodeJS!');
			},
			json: function(){
				var retorno = {
					body: "Bem vindo a sua app NodeJS!"
				}
				res.json(retorno);
			}
		});
	});

	application.post('/',function(req,res){
		res.send(req.body);
	});
}