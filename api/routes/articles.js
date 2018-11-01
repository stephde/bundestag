const { Router } = require('express')
const Article = require('../db/article')

const router = Router()

router.get('/articles', async (req, res, next) => {
  const articles = await Article.find().exec()
  res.json(articles)
})

router.get('/articles/:id', async (req, res, next) => {
  const id = req.params.id
  const article = await Article.findById(id).exec()
  res.json(article)
})

router.delete('/articles', async (req, res, next) => {
  await Article.deleteMany({}).exec()
  res.send('Removed all articles')
})

module.exports = router
