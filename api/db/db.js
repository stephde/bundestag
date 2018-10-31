const mongoose = require('mongoose')
const config = require('../config')

module.exports = {
  init
}

function init () {
  mongoose.connect(`${config.db.uri}/${config.db.name}`)
}
