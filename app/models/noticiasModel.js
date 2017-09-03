module.exports = function(){

	this.getNoticias = function(con, callback){
		con.query('select * from noticias', callback);
	};

	this.getDetalheNoticia = function(con, callback){
		con.query('select * from noticias where id_noticias = 2', callback);
	};

	return this;
}