const express = require('express')
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

const route = express.Router() //route guarda as funções de route que o express tem

//SENHA
route.get('/', (req, res) => res.render("index", {page: 'enter-room'})) //(req, res) (requisição e response(resposta) //o barra é o domínio. no pc do desenvolvedor é a porta, quando subimos para a internet, vira o domínio
route.get('/create-pass', (req, res) => res.render("index", {page: 'create-pass'}))

//ROOM
route.post('/create-room', RoomController.create) //trabalha com salas
route.get('/room/:room', RoomController.open)
route.post('/enterroom', RoomController.enter)

//QUESTÃO
route.post('/question/create/:room', QuestionController.create)
route.post('/question/:room/:question/:action', QuestionController.index) //:cria uma variavel pro conteúdo que vai vim na url


module.exports = route














//post = pega as infos e envia pra rota
//get = pega a rota e mostra
// Linha 18: Formato que o form de dentro da modal tem que passar a informação