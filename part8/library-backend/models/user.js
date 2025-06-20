const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  favouriteGenre: String
})

module.exports = mongoose.model('User', schema)
