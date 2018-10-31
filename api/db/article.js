const mongoose = require('mongoose')

const MODEL_NAME = 'Article'

const Article = mongoose.Schema({
  date: Date,
  link: String,
  rssGuid: String,
  author: String,
  categories: [String],
  title: String,
  content: String,
  parties: [String],
  people: [String],
})

module.exports = mongoose.model(MODEL_NAME, Article)
