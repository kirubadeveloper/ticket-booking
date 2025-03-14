const Event = require('../models/Event');

const createEvent = async (req, res) => {
  try {
    const { name, date, totalTickets } = req.body;
    const event = await Event.create({ name, date, totalTickets, availableTickets: totalTickets });
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.destroy({ where: { id } });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { createEvent, getEvents, deleteEvent };
