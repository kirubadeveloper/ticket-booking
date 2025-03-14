const express = require('express');
const { authMiddleware } = require('../middleware/middleware');
const { bookTicket, getUserBookings, cancelBooking} = require('../controller/booking.controller');
const { createBookingValidation } = require('../validation/booking.validation');
const validate = require('../validation/validationMiddleware');
const router = express.Router();

router.post('/add/:eventId', authMiddleware, createBookingValidation, validate, bookTicket);
router.post('/cancel/:bookingId', authMiddleware, cancelBooking);
router.get('/my-bookings-list', authMiddleware, getUserBookings);

module.exports = router;

