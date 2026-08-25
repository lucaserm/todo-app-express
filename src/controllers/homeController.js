import { Task } from "../models/task.js";

export default class HomeController {
  async index(req, res) {
    const todo = new Task();
    const tarefas = await todo.buscaTarefas();
    res.render("index", { todo: tarefas });
  }
}
