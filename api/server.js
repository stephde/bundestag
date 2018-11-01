const express = require('express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const FileStore = require('session-file-store')(expressSession)
const passport = require('passport')
const uuid = require('uuid/v4')
const config = require('./config')
const rssConnector = require('./connectors/rssConnector')
const db = require('./db/db')

// Create express instance
const app = express()
app.use(bodyParser.json())

app.use(expressSession({
  genid: (req) => {
    return uuid() // use UUIDs as session IDs
  },
  store: new FileStore(),
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

// start db
db.init()

// start rss watcher
rssConnector.initWatcher()

// Require API routes
const routes = [
  require('./routes/authentication')(passport),
  require('./routes/users'),
  require('./routes/articles')
]

// Import API Routes
routes.forEach(router => app.use(router))

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
