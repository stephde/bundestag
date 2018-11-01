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

    articles.forEach(handleNewArticle)
  })
}

async function handleNewArticle (data) {
  const title = parseString(data.title),
      content = parseString(data.description)

  const article = {
    date: data.date,
    title: title,
    content: content,
    link: data.link,
    rssGuid: data.guid,
    categories: data.categories,
    author: data.author,
    parties: extractParties(title, content),
    people: extractPeople(title, content)
  }

  await Article.findOneAndUpdate({link: article.link}, article, {upsert: true}).exec()
}

function parseString(subject) {
  //remove soft hyphens
  return subject.replace(/&shy;+/g,'')
}

const parties = [
  {key: 'CDU/CSU', keyWords: ['CDU', 'CSU', 'die Union', 'Christdemokraten']},
  {key: 'SPD', keyWords: ['SPD', 'Sozialdemokraten']},
  {key: 'FDP', keyWords: ['FDP', 'die Liberalen']},
  {key: 'LINKE', keyWords: ['LINKE']},
  {key: 'Grüne', keyWords: ['Grüne', 'Grünen', 'Bündnis90']},
  {key: 'AFD', keyWords: ['AFD', 'die Alternative']}
]

function containsKeyword (subject, keywords) {
  return keywords.some(keyword => subject.indexOf(keyword) !== -1)
}

function extractParties (title, content) {
  const extractedParties = []

  parties.forEach(p => {
    if (containsKeyword(title, p.keyWords) || containsKeyword(content, p.keyWords)) {
      extractedParties.push(p.key)
    }
  })

  return extractedParties
}

function extractPeople (title, content) {
  // ToDo: get all names and check if they occur
  return []
}
