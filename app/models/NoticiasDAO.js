//Criando uma classe de entidade Que defina AS notícias
function NoticiasDAO(connection){

	/**
		Conexão das notícias
	*/
	this._connection = connection;
}

NoticiasDAO.prototype.getNoticias = function(callback){
	this._connection.query('select * from noticias', callback);
};

NoticiasDAO.prototype.getDetalheNoticia = function(callback){
	this._connection.query('select * from noticias where id_noticias = 1', callback);
};

/**
	Salva uma notícia no BD
	@params noticia Json da notícia a ser salva
	@params callback Callback a ser chamada após a execução
*/
NoticiasDAO.prototype.salvarNoticia = function(noticia, callback){
	//Realizando a insersão com o SQL modificado do JS, com a informação set pode-se passar 
	//O json diretamente para o BD desde que os campos do json tenham o mesmo nome das colunas do BD
	this._connection.query('INSERT INTO noticias set ?', noticia, callback);
}

module.exports = function(){
	return NoticiasDAO;
}