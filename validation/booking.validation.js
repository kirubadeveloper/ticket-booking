const { param } = require('express-validator');

const createBookingValidation = [
  param('eventId').isUUID().withMessage('Invalid event ID'),
];

module.exports = {
    createBookingValidation,
  };