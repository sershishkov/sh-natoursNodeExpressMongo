const mongoose = require('mongoose');
const validator = require('validator');

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
    required: [true, 'Please confirm your password']
  }
});

module.exports = mongoose.model('User', userScema);
