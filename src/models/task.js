import { pool } from "../lib/pg.js";

export class Task {
  constructor(body) {
    this.body = body;
    this.tarefa = null;
  }

  async register() {
    this.cleanUp();
    console.log(this.body)
    const sql = `INSERT INTO tasks(name) VALUES ('${this.body.nome}')`;
    this.tarefa = await pool.query(sql);
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      nome: this.body.nome,
    };
  }

  async buscaTarefas() {
    const sql = "SELECT * FROM tasks";
    const tarefas = await pool.query(sql);
    console.log(tarefas)
    return tarefas;
  }

  async delete(id) {
    if (typeof id !== "string") return;
    const sqlId = `SELECT FROM tasks WHERE name = ${""}`;
    const sql = `DELETE FROM tasks WHERE id = ${id}`;
    return await pool.query(sql);
  }
}
