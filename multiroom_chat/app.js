/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar porta de escuta */
var server = app.listen(app.config.serverPort, function(){
    console.log('Servidor online ouvindo a porta ' + app.config.serverPort);
})

var io = require('socket.io').listen(server);

app.set('io', io);

/* 	Criando conexão via websocket */
io.on('connection',function(socket){
	console.log('O usuário conectou-se');

	io.on('disconnect',function(socket){
		console.log('O usuário desconectou-se');
	});

	socket.on('msgParaServidor', function(data){

		io.emit('msgParaCliente',
		{ apelido: data.apelido, mensagem: data.mensagem} );

		/* participantes */
		if( data.apelido_atualizado == '0' ){
			io.emit('participantesParaCliente',
			{ apelido: data.apelido } );
		}

	});
});