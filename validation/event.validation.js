const { body } = require('express-validator');

const createEventValidation = [
    body('name').notEmpty().withMessage('Event name is required'),
    body('date').isISO8601().withMessage('Invalid date format (YYYY-MM-DD)'),
    body('totalTickets')
      .isInt({ min: 1 })
      .withMessage('Total tickets must be a positive integer'),
    body('availableTickets')
      .isInt({ min: 0 })
      .withMessage('Available tickets must be a non-negative integer'),
  ];

  module.exports = {
    createEventValidation,
  };