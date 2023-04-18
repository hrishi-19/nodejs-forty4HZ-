const { register, login, createTableUser } = require('../../controller/user/user')

const router = require('express').Router()

//user routes
router.get('/createtableuser', createTableUser)
router.post('/register', register)
router.post('/login', login)

module.exports = router