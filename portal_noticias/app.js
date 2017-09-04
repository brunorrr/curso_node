/*
	Primeiro script rodado no servidor pelo Node, realiza a chama das configurações
	e solicita a reserva da porta a ser utilizada pelo servidor.
*/

//Carrega os módulos de configuração e os outros scripts
var app = require('./config/server');

//Reserva a porta que o servidor irá ouvir.
app.listen(app.config.port, function(){
	console.log('Servidor rodando e ouvindo a porta ' + app.config.port);
});