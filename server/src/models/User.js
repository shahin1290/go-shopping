const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const schema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      validate: {
        validator: async (email) =>
          (await User.where({ email }).countDocuments()) === 0,
        message: () => 'The email address is already in use.'
      }
    },
    password: String
  },
  { timestamps: true }
)

schema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
})

schema.methods.matchPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model('users', schema)

export default User
