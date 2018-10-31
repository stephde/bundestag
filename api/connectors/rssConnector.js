const Watcher = require('rss-watcher')
const Article = require('../db/article')
const config = require('../config')

const options = {interval: 60}

module.exports = {
  initWatcher
}

function initWatcher () {
  const watcher = new Watcher(config.rssFeedUri)
  watcher.set(options)

  watcher.on('new article', handleNewArticle)

  watcher.run((err, articles) => {
    if (err) {
      console.err(err)
    }

  })
}

function handleNewArticle (data) {
  const article = new Article({
    date: data.date,
    title: data.title,
    content: data.description,
    link: data.link,
    rssGuid: data.guid,
    categories: data.categories,
    author: data.author,
    parties: extractParties(data.title, data.description),
    people: extractPeople(data.title, data.description)
  })

  article.save()
}

function extractParties (title, content) {
  // ToDo: List all parties and "nicknames" and check
  return []
}

function extractPeople (title, content) {
  // ToDo: get all names and check if they occur
  return []
}
