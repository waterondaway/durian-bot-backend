const express = require('express')
const router = express.Router()
const { getUsers, createUser } = require('../controllers/userController')
const { auth } = require('../middleware/authMiddleware')

router.get('/user', auth, getUsers);

module.exports = router
