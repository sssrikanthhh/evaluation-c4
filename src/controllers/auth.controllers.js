const router = require('express').Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const User = require('../models/user.models');

dotenv.config();

router.post('/register', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(500).send({ err: 'email is already taken!' });
    }
    const newUser = await User.create(req.body);
    console.log(newUser);
    const token = jwt.sign({ newUser }, process.env.JWT_SCREAT);
    return res.status(201).send({ newUser, token });
  } catch (err) {
    return res.status(501).send({ err: 'cannot register user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    let user = await User.findOne({ email: user.body.email });
    if (user) {
      return res.status(500).send({ err: 'email or password is wrong!' });
    }
    const pswdCheck = user.verifyPswd(req.body.password);
    if (!pswdCheck) {
      return res.status(500).send({ err: 'email or password is wrong!' });
    }
    return res.status(201).send(user);
  } catch (err) {
    return res.status(501).send({ err: 'cannot login user' });
  }
});

module.exports = router;