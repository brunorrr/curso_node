//Outra forma de declarar as variáveis
var express = require('express'),
		bodyParser = require('body-parser'),
		mongodb = require('mongodb'),
		objectId = require('mongodb').ObjectId,
		multiparty = require('connect-multiparty'),
		fs = require('fs');

var app = express();

//body-parser
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(multiparty());

var port = 8080;

app.listen(port);

var db = new mongodb.Db(
	'instagram',
	new mongodb.Server('localhost', 27017, {}),
	{}
);

console.log('Servidor HTTP escutando ' + port);

app.get('/',function(req,res){
	res.send({msg:'Olá mundo!'});
});

//inclusão
app.post('/api', function(req,res){
	res.setHeader('Access-Control-Allow-Origin', '*');

	var date = new Date();

	var url_imagem = date.getTime() + '_' + req.files.arquivo.originalFilename;

	var path_origem = req.files.arquivo.path;
	var path_destino = './uploads/' + url_imagem;

	fs.rename(path_origem, path_destino, function(err){
		if( err ){
			res.status(500).json({error: err});
			return;
		}

		var dados = {
			url_imagem: req.files.arquivo.originalFilename,
			titulo: req.body.titulo,
		}

		db.open( function(err, mongoclient){
			mongoclient.collection('postagens', function(err, collecion){
				collecion.insert(dados, function(err, records){
					if( err ){
						res.status(500).json(err);
					} else{
						res.status(204).end();
					}
					mongoclient.close();
				});
			});
		})
	});
});


//Leitura
app.get('/api', function(req,res){
	var dados = req.body;

	db.open( function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collecion){
			collecion.find().toArray(function(err, results){
				if( err ){
					res.status(500).json(err);
				} else{
					res.json(results);
				}
				mongoclient.close();			
			});
		});
	})
});

//Leitura com um path param
app.get('/api/:id', function(req,res){
	var dados = req.body;

	db.open( function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collecion){
			collecion.find(objectId(req.params.id)).toArray(function(err, results){
				if( err ){
					res.status(500).json(err);
				} else{
					res.json(results);
				}
				mongoclient.close();			
			});
		});
	})
});

//Alterando registro com o método put
app.put('/api/:id', function(req,res){
	var dados = req.body;

	db.open( function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collecion){
			collecion.update(
				{ _id: objectId(req.params.id) },
				{ $set: { titulo: req.body.titulo } },
				{},
				function(err, records){
					if( err ){
						res.status(500).json(err);
					}
					else{
						res.status(204).end();
					}
					mongoclient.close();
				}
			);
		});
	})
});

//Removendo registro com o método delete
app.delete('/api/:id', function(req,res){
	var dados = req.body;

	db.open( function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collecion){
			collecion.remove(
				{ _id: objectId(req.params.id)},
				function(err, records){
					if( err ){
						res.status(500).json(err);
					}
					else{
						res.status(204).end();
					}
					mongoclient.close();
				}
			);
		});
	})
});