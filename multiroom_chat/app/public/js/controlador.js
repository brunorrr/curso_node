var socket = io('http://localhost');

$('#form-envio-msg').on('submit',function(e){

	var data = {
		apelido: $('#apelido').val(), 
		mensagem: $('#mensagem').val(),
		apelido_atualizado : $('#apelido_atualizado').val()
	};
	if( $('#mensagem').val() ){
		socket.emit(
			'msgParaServidor',
			data		
		);
		$('#apelido_atualizado').val('1');
		$('#mensagem').val('');

		jogarMensagem(data);
	}
	e.preventDefault();
});

socket.on('msgParaCliente', function(data){

	jogarMensagem(data);

})

socket.on('participantesParaCliente', function(data){
	var html = '<span class="participante">' +
		'<img src="images/ico_usuario.png" alt="Imagem usuário" />' +
		data.apelido +
	'</span>';
	$('#pessoas').append(html);
})

socket.on('okMsgEnviada', function(data){
	//TODO colocar o campo de mensagem enviada e adicionar a lógica aqui
	console.log(data);
});

var jogarMensagem = function(data){
	var html = '<div class="dialogo">'+
		'<h4>' + data.apelido + '</h4>' +
		'<p>' + data.mensagem + '</p>' + 
	'</div>';

	$('#dialogos').append(html);

	window.scrollTo(0, document.body.scrollHeight)
}