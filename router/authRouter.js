const express = require('express');
const { register, login } = require('../controller/auth.controller');
const { registerValidation, loginValidation } = require('../validation/auth.validation');
const validate = require('../validation/validationMiddleware');

const router = express.Router();

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);

module.exports = router;
