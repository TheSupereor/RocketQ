const express = require('express');
const route = require('./route');
const path = require('path');

const server = express();   //iniciando o server

server.set('view engine', 'ejs'); //setando a view engine como a ejs
server.use(express.static("public"));   //dizendo em que pasta está o conteúdo
server.set('views', path.join(__dirname, 'views')); //setando o caminho para a pasta views
//usando o path para encontrar a pasta automaticamente

server.use(express.urlencoded({extended: true}));   //configurando o midware para trabalhar entre a rota e o destino da rota

server.use(route);  //usando o arquivo route

server.listen(3000, () => console.log("RODANNDOOO"));

