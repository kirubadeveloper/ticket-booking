const { body } = require('express-validator');

const registerValidation = [
    body('name')
      .notEmpty()
      .withMessage('Name is required'),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
      .notEmpty()
      .withMessage('Password is required'),
  ];


  const loginValidation = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
  ];


  module.exports = {
    registerValidation,
    loginValidation,
  };