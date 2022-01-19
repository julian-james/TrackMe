const router = require('express').Router();

const authController = require('../controllers/auth');

// const User = require('../model/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// const { registerValidation, loginValidation } = require('../validation');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser); 

module.exports = router;