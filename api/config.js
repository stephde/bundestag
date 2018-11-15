module.exports = {
  db: {
    uri: process.env.MONGO_DB_URI || 'localhost',
    user: process.env.MONGO_DB_USER || null,
    password: process.env.MONGO_DB_PASSWORD || null,
    name: 'bundestag'
  },
  rssFeedUri: 'https://www.bundestag.de/static/appdata/includes/rss/aktuellethemen.rss',
  sessionSecret: process.env.SESSION_SECRET || 'thisIsSecret'
}
