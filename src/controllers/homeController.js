const Todo = require('../models/ToDoModel');

exports.index = async(req, res) => {
  const todo = await Todo.buscaTarefas();
  res.render('index', { todo });
};