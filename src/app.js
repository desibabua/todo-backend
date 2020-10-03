const express = require('express');
const morgan = require('morgan');
const handlers = require('./handlers');
const { db } = require('./getDatabase');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.use(morgan('dev'));

app.use(handlers.attachTodo);

app.locals.db = db;

app.get('/api/getAllToDos', handlers.getAllToDos);

app.post('/api/resetTodo', handlers.resetTodo);
app.post('/api/updateTitle', handlers.updateTitle);
app.post('/api/addTask', handlers.addTask);
app.post('/api/deleteTask', handlers.deleteTask);
app.post('/api/updateStatus', handlers.updateStatus);

module.exports = { app };
