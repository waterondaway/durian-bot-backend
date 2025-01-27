const express = require('express')
const router = express.Router()
const { login, register, farmerRegister } = require("../controllers/authControl")

router.post('/login', login);
router.post('/register', register);
router.post('/farmer_register', farmerRegister)

module.exports = router