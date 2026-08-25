import express from "express";

import TarefasController from "./src/controllers/tarefasController.js";
import HomeController from "./src/controllers/homeController.js";

export const route = express.Router();

// Rota da Home
const homeController = new HomeController();
route.get("/", homeController.index);

// Rota de manipulação das tarefas
const tarefasController = new TarefasController();
route.get("/tarefa/index", tarefasController.index);
route.post("/tarefa/register", tarefasController.register);
route.get("/tarefa/delete/:id", tarefasController.delete);
