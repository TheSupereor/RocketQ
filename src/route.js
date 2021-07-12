const express = require('express');
const QuestionController = require("./controllers/QuestionController");
const RoomController = require("./controllers/RoomController");

const route = express.Router();

route.get('/', (req, res) => {      //pegar requisições e respostas
    res.render("index", { page: 'enter-room' });
})

route.get('/create-pass', (req, res) => {
    res.render("index", { page: 'create-pass' });
})

route.post('/create-room', RoomController.create)
route.get('/room/:room', RoomController.open)   //rotas para as interações com o form
route.post('/enterRoom', RoomController.enter)  //POST envia formulários

//formato de passe de informação
route.post('/question/create/:room', QuestionController.create);
route.post('/question/:room/:question/:action', QuestionController.index);

module.exports = route;
