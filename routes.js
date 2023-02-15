const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const tarefasController = require('./src/controllers/tarefasController');

// Rota da Home
route.get('/', homeController.index);

// Rota de manipulação das tarefas
route.get('/tarefa/index', tarefasController.index);
route.post('/tarefa/register', tarefasController.register);
route.get('/tarefa/delete/:id', tarefasController.delete);

module.exports = route;