module.exports = {
  db: {
    uri: process.env.MONGO_DB_URI || 'mongodb://localhost',
    name: 'bundestag'
  },
  rssFeedUri: 'https://www.bundestag.de/static/appdata/includes/rss/aktuellethemen.rss',
  sessionSecret: process.env.SESSION_SECRET || 'thisIsSecret'
}
