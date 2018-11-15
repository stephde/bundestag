const mongoose = require('mongoose')
const config = require('../config')

module.exports = {
  init
}

const MONGO_BASE_PATH = 'mongodb://'

function init () {
  let login = ''

  if (config.db.user) {
    login = `${config.db.user}:${config.db.password}@`
  }

  const path = `${MONGO_BASE_PATH}${login}${config.db.uri}/${config.db.name}`

  mongoose.connect(path)
}
