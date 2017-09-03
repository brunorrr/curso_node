module.exports = function(){

	this.getNoticias = function(con, callback){
		con.query('select * from noticias', callback);
	};

	this.getDetalheNoticia = function(con, callback){
		con.query('select * from noticias where id_noticias = 2', callback);
	};

	/**
		Salva uma notícia no BD
		@params noticia Json da notícia a ser salva
		@params con Conexão com o BD
		@params callback Callback a ser chamada após a execução
	*/
	this.salvarNoticia = function(noticia, con, callback){
		//Realizando a insersão com o SQL modificado do JS, com a informação set pode-se passar 
		//O json diretamente para o BD desde que os campos do json tenham o mesmo nome das colunas do BD
		con.query('INSERT INTO noticias set ?', noticia, callback);
	}

	return this;
}