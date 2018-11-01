const mongoose = require('mongoose')

const MODEL_NAME = 'User'

const User = mongoose.Schema({
  password: String,
  username: String,
  email: String,
  readArticles: {
    type: [String],
    default: []
  },
  likedArticles: {
    type: [String],
    default: []
  },
  dislikedArticles: {
    type: [String],
    default: []
  },
  lastLoginDate: {
    type: Date,
    default: Date.now
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model(MODEL_NAME, User)
