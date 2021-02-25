const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: 'Email is required!',
    lowercase: true,
    index: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },

  password: {
    type: String,
    minlength: [6, 'Minimum password length is 6 characters!'],
    maxlength: [32, 'Maximum password length is 32 characters!'],
    required: true,
  },
});

schema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
});

schema.methods.matchPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', schema);
module.exports = { User };
