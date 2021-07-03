const express = require('express')
const route = require('./route')
const path = require('path') //pega o caminho da pasta

const server = express() //inicia o express e guarda no server

server.set('view engine', 'ejs')

server.use(express.static("public")) //o conteúdo estático que ta na pasta public

server.set('views', path.join(__dirname, 'views'))

server.use(express.urlencoded({extended: true})) //pega o conteúdo que vem do form e passa pro controller através da rota

server.use(route) //começou a usar o arquivo route

server.listen(3000, () => console.log('RODANDO')) 
//chama o listen que existe dento do express que está no server. Por isso chamar o listen do server. 
//server.listen(porta, o que roda (onde o => substitui o { }))

