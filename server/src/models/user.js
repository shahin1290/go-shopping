const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
})

schema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12)
})

schema.methods.matchPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', schema)
module.exports = { User }
