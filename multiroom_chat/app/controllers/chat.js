module.exports.iniciaChat = function(application, req, res){

    var dadosForm = req.body;

    req.assert('apelido', 'Nome ou Apelido é obrigatório').notEmpty();
    req.assert('apelido', 'Nome ou Apelido deve conter entre 3 e 15 caracteres').len(3,15);

    var erros = req.validationErrors();

    if(erros){
        res.render("index", { validacao : erros });
        return;
    }

    application.get('io').emit(
        'msgParaCliente',
        {apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat!'}
    )

<<<<<<< HEAD
    res.render('chat');
=======
	app.get('io').emit('msgParaCliente',
		{ apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat.'} );

	res.render('chat',{dadosForm: dadosForm});
>>>>>>> 16b3063
}