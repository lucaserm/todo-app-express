const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todo',
  password: 'postgres',
  port: 5432
});

function Todo(body){
  this.body = body;
  this.tarefa = null;
};

Todo.prototype.register = async function() {
  this.cleanUp();
  const sql = `INSERT INTO things(obj) VALUES ('${this.body.nome}')`;
  this.tarefa =  await pool.query(sql);
};

Todo.prototype.cleanUp = function() {
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }
  
  this.body = {
    nome: this.body.nome
  }
};

Todo.buscaTarefas = async function() {
  const sql = 'SELECT * FROM things';
  const tarefas = await pool.query(sql);
  return tarefas;
};

Todo.delete = async function(id){
  if(typeof id !== 'string') return;
  const sqlId = `SELECT FROM things WHERE obj = ${''}`;
  const sql = `DELETE FROM things WHERE id = ${id}`;
  const tarefa = await pool.query(sql);
  return tarefa;
};

module.exports = Todo;