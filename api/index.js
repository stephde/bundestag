const express = require('express')
const rssConnector = require('./connectors/rssConnector')

// Create express instance
const app = express()

// Require API routes
const users = require('./routes/users')

// Import API Routes
app.use(users)

// start rss watcher
rssConnector.initWatcher()

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
