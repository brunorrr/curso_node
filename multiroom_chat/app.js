/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar porta de escuta */
app.listen(app.config.serverPort, function(){
    console.log('Servidor online ouvindo a porta ' + app.config.serverPort);
})