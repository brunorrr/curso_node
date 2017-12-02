/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
app.listen(app.config.serverPort, function(){
	console.log('Servidor online');
})