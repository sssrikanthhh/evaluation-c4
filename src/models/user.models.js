const mongoose = require('mongoose');
const bycrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true }
}, {
  versionKey: false,
  timestamps: true
});

userSchema.pre('save', function (next) {
  const hashPswd = bycrypt.hashSync(this.password, 4);
  this.password = hashPswd;
  next();
});

userSchema.methods.verifyPassword = function (password) {
  return bycrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);