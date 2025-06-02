const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 2 },
  published: Number,
  genres: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }
})

module.exports = mongoose.model('Book', schema)