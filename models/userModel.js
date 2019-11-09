const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userScema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please, tell us your name'],
    minLength: [4, 'A name must have more or equal the 4 characters']
  },
  email: {
    type: String,
    required: [true, 'Please, provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please, provide a valid email']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minLength: [8, 'A password must have more or equal the 8 characters']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // this only works on CREATE and SAVE
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  }
});

userScema.pre('save', async function(next) {
  //Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

module.exports = mongoose.model('User', userScema);