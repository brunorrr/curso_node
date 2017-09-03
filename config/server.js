/*
	Realiza a chama aos módulos especializados do servidor e chama os módulos externos de dependência
*/

//Chama o módulo Express para organização de views
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var consign = require('consign');
var expressValidator = require('Express-validator');

app.set('view engine', 'ejs');
app.set('views', './app/views');

//Importa variáveis de configuração
app.config = require('./configVar');

//Carrega o bodyparser do app, o bodyparser irá fazer a manipulação o body da requisição
app.use(bodyParser.urlencoded({extended: true}));

//Carrega o Express-validator para a validação de campos
app.use(expressValidator());

//Chamando os arquivos estáticos e definindo por padrão que eles estão dentro de app/public
app.use(express.static('./app/public'));

//Carrega o Consign que automatiza os scripts e permite a organização por diretórios
consign().include('app/routes')
		.then('config/dbConnection.js')
		.then('app/models')
		.then('app/controllers')
		.into(app);

module.exports = app;