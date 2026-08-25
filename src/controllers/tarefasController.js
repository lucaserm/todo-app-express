import { Task } from "../models/task.js";

export default class TarefasController {
  index(req, res) {
    res.render("tarefas", {
      tarefa: {},
      csrfToken: req.csrfToken(),
    });
  }

  async register(req, res) {
    try {
      const tarefa = new Task(req.body);
      await tarefa.register();

      req.flash("success", "Tarefa registrada com sucesso.");
      req.session.save(() => res.redirect(`/tarefa/index`));
      return;
    } catch (e) {
      console.log(e);
      return res.render("404");
    }
  }

  async delete(req, res) {
    console.log(req.params.id)
    if (!req.params.id) return res.render("404");
    const todo = new Task();
    const tarefa = await todo.delete(req.params.id);
    if (!tarefa) return res.render("404");

    req.flash("success", "Tarefa apagada com sucesso.");
    req.session.save(() => res.redirect("back"));
    return;
  }
}
