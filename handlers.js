const express = require('express');
const { getDefaultStatus, getNextStatus } = require('./Statuses');

const app = express();
app.use(express.json());
app.use(express.static('public'))

const DEFAULT_HEADING = 'Todo';
const initializeToDos = () => {
  return {
    title: DEFAULT_HEADING,
    toDos: [],
    lastTaskId: 0,
  };
};

app.locals.todoList = initializeToDos();

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.get('/api/resetTodo', (req, res) => {
  app.locals.todoList = initializeToDos();
  res.json(app.locals.todoList);
});

app.get('/api/getAllToDos', (req, res) => {
  const {todoList} = app.locals;
  res.end(JSON.stringify(todoList));
});

app.post('/api/updateTitle', (req, res) => {
  const { todoList } = app.locals;
  todoList.title = req.body.title;
  res.end();
});

app.post('/api/addTask', (req, res) => {
  const { todoList } = app.locals;
  const { task } = req.body;
  todoList.lastTaskId++;
  todoList.toDos = [
    ...todoList.toDos,
    { id: todoList.lastTaskId, task, status: getDefaultStatus() },
  ];
  res.end();
});

app.post('/api/deleteTask', (req, res) => {
  const { todoList } = app.locals;
  const { taskId } = req.body;
  todoList.toDos = todoList.toDos.filter((task) => task.id !== taskId);
  res.end();
});

app.post('/api/updateStatus', (req, res) => {
  const { todoList } = app.locals;
  const { taskId } = req.body;
  const task = todoList.toDos.find((task) => task.id === taskId);
  task.status = getNextStatus(task.status);
  res.end();
});

module.exports = { app };
