const express = require('express');
const handlers = require('./handlers');
const { db } = require('./getDatabase');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(handlers.attachTodo);

app.locals.db = db;

app.get('/api/getAllToDos', handlers.getAllToDos);

app.post('/api/resetTodo', handlers.resetTodo);
app.post('/api/updateTitle', handlers.updateTitle);
app.post('/api/addTask', handlers.addTask);
app.post('/api/deleteTask', handlers.deleteTask);
app.post('/api/updateStatus', handlers.updateStatus);

module.exports = { app };
