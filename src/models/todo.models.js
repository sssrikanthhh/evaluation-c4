const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: 'user' }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);