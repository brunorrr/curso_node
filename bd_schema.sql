create database portal_noticias;
USE portal_noticias;

DROP TABLE IF EXISTS noticias;

CREATE TABLE noticias(
	id_noticias INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    noticia TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE noticias ADD COLUMN resumo varchar(100) DEFAULT NULL COMMENT 'Resumo da notícia';
ALTER TABLE noticias ADD COLUMN autor varchar(30) DEFAULT NULL COMMENT 'Nome do autor da notícia';
ALTER TABLE noticias ADD COLUMN data_noticia DATE NOT NULL COMMENT 'Data da ocorrência da notícia';

/* TRUNCATE TABLE noticias;
 INSERT INTO noticias(titulo,noticia, data_noticia) VALUES('Tituladaso da Noticia', 'Conteudo da Noticia', curdate());
*/
SELECT * FROM noticias order by data_criacao desc limit 5;