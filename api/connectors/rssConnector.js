const Watcher = require('rss-watcher')

const BUNDESTAG_FEED_URL = 'https://www.bundestag.de/static/appdata/includes/rss/aktuellethemen.rss'

const options = {interval: 60}

module.exports = {
  initWatcher
}

function initWatcher () {
  const watcher = new Watcher(BUNDESTAG_FEED_URL)
  watcher.set(options)

  watcher.on('new article', handleNewArticle)

  watcher.run((err, articles) => {
    if (err) {
      console.err(err)
    }

    console.info(articles)
  })
}

function handleNewArticle (article) {
  console.info(article)
}
