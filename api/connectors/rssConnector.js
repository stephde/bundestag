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

function parseString (subject) {
  // remove soft hyphens
  return subject.replace(/&shy;+/g, '')
}

const partyKeys = {
  UNION: 'CDU/CSU',
  SPD: 'SPD',
  FDP: 'FDP',
  LINKE: 'LINKE',
  GRUENE: 'Grüne',
  AFD: 'AFD'
}
const parties = [
  {key: partyKeys.UNION, keyWords: ['CDU', 'CSU', 'die Union', 'Christdemokraten']},
  {key: partyKeys.SPD, keyWords: ['SPD', 'Sozialdemokraten']},
  {key: partyKeys.FDP, keyWords: ['FDP', 'die Liberalen']},
  {key: partyKeys.LINKE, keyWords: ['LINKE', 'Linke', 'Linkspartei']},
  {key: partyKeys.GRUENE, keyWords: ['Grüne', 'Grünen', 'Bündnis90']},
  {key: partyKeys.AFD, keyWords: ['AFD', 'AfD', 'die Alternative']}
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
