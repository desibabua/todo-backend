const { getDefaultStatus, getNextStatus } = require('./Statuses');

const initializeToDos = () => ({ title: 'Todo', toDos: [], lastId: 0 });

const attachTodo = (req, res, next) => {
  req.app.locals.db
    .getTodoDetails()
    .then((details) => {
      req.app.locals.todoList = details || initializeToDos();
    })
    .then(next);
};

const getAllToDos = (req, res) => {
  const { todoList } = req.app.locals;
  res.json(todoList);
};

const resetTodo = (req, res) => {
  const { db } = req.app.locals;
  db.setTodoDetails(initializeToDos());
  res.end();
};

const updateTitle = (req, res) => {
  const { todoList, db } = req.app.locals;
  todoList.title = req.body.title;
  db.setTodoDetails(todoList);
  res.end();
};

const addTask = (req, res) => {
  const { todoList, db } = req.app.locals;
  const { task } = req.body;
  todoList.lastId++;
  todoList.toDos = [
    ...todoList.toDos,
    { id: todoList.lastId, task, status: getDefaultStatus() },
  ];
  db.setTodoDetails(todoList);
  res.end();
};

const deleteTask = (req, res) => {
  const { todoList, db } = req.app.locals;
  const { taskId } = req.body;
  todoList.toDos = todoList.toDos.filter((task) => task.id !== taskId);
  db.setTodoDetails(todoList);
  res.end();
};

const updateStatus = (req, res) => {
  const { todoList, db } = req.app.locals;
  const { taskId } = req.body;
  const task = todoList.toDos.find((task) => task.id === taskId);
  task.status = getNextStatus(task.status);
  db.setTodoDetails(todoList);
  res.end();
};

module.exports = {
  attachTodo,
  resetTodo,
  getAllToDos,
  updateTitle,
  addTask,
  deleteTask,
  updateStatus,
};
