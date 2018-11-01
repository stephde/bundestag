const { Router } = require('express')
const User = require('../db/user')

const router = Router()

/* GET users listing. */
router.get('/users', async function (req, res, next) {
  const users = await User.find({}).exec()
  res.json(users)
})

/* GET user by ID. */
router.get('/users/:id', async function (req, res, next) {
  const id = req.params.id

  const user = await User.findById(id).exec()

  res.json(user)
})

router.post('/users', async function (req, res, next) {
  console.info(req.body)
  const userData = {
    username: req.body.username,
    email: req.body.email
  }

  const user = new User(userData)

  await user.save()

  res.json(user)
})

router.put('/users/:id', async function (req, res, next) {
  const id = req.params.id

  const user = await User.findOneAndUpdate({_id: id}, data).exec()

  res.json(user)
})

module.exports = router
