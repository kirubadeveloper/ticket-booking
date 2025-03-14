const express = require('express');
const { createEvent, getEvents, deleteEvent } = require('../controller/event.controller');
const { authMiddleware, authorize } = require('../middleware/middleware');
const { createEventValidation } = require('../validation/event.validation');
const validate = require('../validation/validationMiddleware');

const router = express.Router();

router.post('/add', authMiddleware, authorize(['admin']), createEventValidation, validate, createEvent); 
router.get('/list', authMiddleware, authorize(['admin', 'user']), getEvents); 
router.delete('/:id', authMiddleware, authorize(['admin']), deleteEvent); 

module.exports = router;
