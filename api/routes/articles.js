const { Router } = require('express')
const Article = require('../db/article')

const router = Router()

/* GET users listing. */
router.get('/articles', async function (req, res, next) {
  const articles = await Article.find().exec()
  res.json(articles)
})

module.exports = router
