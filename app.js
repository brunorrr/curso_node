var app = require('./config/server');
//require('./app/routes/noticias')(app);
//require('./app/routes/home')(app);
//require('./app/routes/form_inc_noticias')(app);

app.listen(3000, function(){
	console.log('Servidor rodando com express, nodemon e consign');
});