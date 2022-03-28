const router = require('express').Router();

const Todo = require('../models/todo.models');
const authenticate = require('../middlewares/authenticate');

// getting all todos created by logged in user

router.get('/', authenticate, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id }).lean().exec();
    return res.status(201).send(todos);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

// creating a single todo with loggedin user

router.post('/', authenticate, async (req, res) => {
  try {
    req.body.userId = req.user._id;
    const todo = await Todo.create(req.body);
    return res.status(201).send(todo);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

// getting single todo created by loggedin user

router.get('/:id', authenticate, async (req, res) => {
  try {
    let todo = await Todo.findById();
    if (todo.userId !== req.user._id) {
      return res.status(401).send('unauthorized, you cannot view this todo');
    }
    return res.status(201).send(todo);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

// modifying the a todo by id with loggedin user(who created the todo)

router.patch('/:id', authenticate, async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);
    if (todo.userId !== req.user._id) {
      return res.status(401).send('unauthorized, you cannot modify this todo');
    }
    todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(201).send(todo);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

// deleting the a todo by id with loggedin user(who created the todo)

router.delete('/:id', authenticate, async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);
    if (todo.userId !== req.user._id) {
      return res.status(401).send('unauthorized, you cannot delete this todo');
    }
    todo = await Todo.findByIdAndDelete(req.params.id);
    return res.status(201).send(todo);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

module.exports = router;