const Todo = require('../models/ToDoModel');
const Tarefa = require('../models/ToDoModel');

exports.index = (req, res) => {
  res.render('tarefas', {
    tarefa: {},
    csrfToken: req.csrfToken()
  });
};

exports.register = async(req, res) => {
  try {
    const tarefa = new Tarefa(req.body);
    await tarefa.register();

    req.flash('success', 'Tarefa registrada com sucesso.');
    req.session.save(() => res.redirect(`/tarefa/index`));
    return;
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
}

exports.delete = async function(req, res){
  if(!req.params.id) return res.render('404');
  const tarefa = await Todo.delete(req.params.id);
  if(!tarefa) return res.render('404');

  req.flash('success', 'Tarefa apagada com sucesso.');
  req.session.save(() => res.redirect('back'));
  return;
}