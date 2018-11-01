const express = require('express')
const bodyParser = require('body-parser')
const rssConnector = require('./connectors/rssConnector')
const db = require('./db/db')

// Create express instance
const app = express()
app.use(bodyParser.json())

// Require API routes
const routes = [
  require('./routes/users'), require('./routes/articles')
]

// start db
db.init()

// start rss watcher
rssConnector.initWatcher()

// Import API Routes
routes.forEach(router => app.use(router))

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
