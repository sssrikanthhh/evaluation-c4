const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./configs/db');
const usersController = require('./controllers/auth.controllers');
const todosController = require('./controllers/todo.controllers');

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.use('/users', usersController);
app.use('/todos', todosController);


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});