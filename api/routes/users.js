const { Router } = require('express')
const bcrypt = require('bcrypt')
const httpStatus = require('http-status')
const User = require('../db/user')

const router = Router()
const BCRYPT_SALT_ROUNDS = 10

/* GET users listing. */
router.get('/users', async function (req, res, next) {
  const users = await User.find({}).lean().exec()
  res.json(users)
})

/* GET user by ID. */
router.get('/users/:id', async function (req, res, next) {
  const id = req.params.id

  const user = await User.findById(id).lean().exec()

  res.json(user)
})

router.post('/users', async function (req, res, next) {
  console.info(req.body)
  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, BCRYPT_SALT_ROUNDS)
  }

  const exists = await User.findOne({email: userData.email})

  if (exists !== null) {
    return res.status(httpStatus.CONFLICT).send(`The email address ${userData.email} is already in use`)
  }

  const user = new User(userData)
  await user.save()
  req.session.user = user
  res.json(user)
})

router.put('/users/:id', async function (req, res, next) {
  const id = req.params.id
  const data = req.body
  delete data._id

  const user = await User.findOneAndUpdate(
    {_id: id},
    {$set: data},
    {new: true},
  ).lean().exec()

  console.info(JSON.stringify(user))

  res.json(user)
})

module.exports = router
