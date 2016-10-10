const mongoose = require('mongoose')
const Schema   = mongoose.Schema

module.exports = mongoose.model('Post', new Schema({
  publishedAt: String,
  updatedAt: String,
  titulo: String,
  conteudo: String
}))
