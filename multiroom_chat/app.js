/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar porta de escuta */
<<<<<<< HEAD
var server = app.listen(80, function(){
    console.log('Servidor online');
=======
var server = app.listen(app.config.serverPort, function(){
    console.log('Servidor online ouvindo a porta ' + app.config.serverPort);
>>>>>>> 16b3063
})

var io = require('socket.io').listen(server);

app.set('io', io);

<<<<<<< HEAD
/* Criar a conexão por WebSocket */
io.on('connection', function(socket){
    console.log('Usuário conectou');

    socket.on('disconnect', function(){
        console.log('Usuário desconectou');
    });
=======
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
>>>>>>> 16b3063
});