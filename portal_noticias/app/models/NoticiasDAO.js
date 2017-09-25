/*
	Módulo de conexão e query no Banco de Dados para os objetos de Notícias
 */

/**
 * DAO das notícias
 * @param {Object} Conexão com o Banco de Dados
 */
function NoticiasDAO(connection){

	/**
	 * Conexão das notícias
	 * @type {Object}
	 */
	this._connection = connection;
}

NoticiasDAO.prototype.getNoticias = function(callback, quantidade){
	if( !quantidade )
		quantidade = require('../../config/configVar').quantidadeNoticias;

	this._connection.query('select * from noticias ORDER BY data_criacao DESC LIMIT ' + quantidade, callback);
};

NoticiasDAO.prototype.getDetalheNoticia = function(id_noticia, callback){
	this._connection.query('select * from noticias where id_noticias = ' + id_noticia, callback);
};

/**
 * Salva uma notícia no BD
 * @param  {Object}   noticia  Json da notícia a ser salva
 * @param  {Function} callback Callback a ser chamada após a execução
 */
NoticiasDAO.prototype.salvarNoticia = function(noticia, callback){
	//Realizando a insersão com o SQL modificado do JS, com a informação set pode-se passar 
	//O json diretamente para o BD desde que os campos do json tenham o mesmo nome das colunas do BD
	this._connection.query('INSERT INTO noticias set ?', noticia, callback);
}

module.exports = function(){
	return NoticiasDAO;
}