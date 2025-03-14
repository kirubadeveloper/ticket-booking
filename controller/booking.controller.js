const sequelize = require('../config/db');
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const User = require('../models/User');


const bookTicket = async (req, res) => {
    const { eventId } = req.params; 
    console.log('eventId: ', eventId);
    const userId = req.user.id; 
    console.log('userId: ', userId);
    const transaction = await sequelize.transaction();
  
    try {
      const existingBooking = await Booking.findOne({
        where: { userId, eventId },
        transaction,
        lock: transaction.LOCK.UPDATE, 
      });
  
      console.log('existingBooking: ', existingBooking);
      if (existingBooking) {
        await transaction.rollback();
        return res.status(400).json({ message: 'You have already booked this event' });
      }
  
      const event = await Event.findOne({
        where: { id: eventId },
        transaction,
        lock: transaction.LOCK.UPDATE, 
      });
  
      if (!event) {
        await transaction.rollback();
        return res.status(404).json({ message: 'Event not found' });
      }
  
      if (event.availableTickets <= 0) {
        await transaction.rollback();
        return res.status(400).json({ message: 'No tickets available for this event' });
      }
  
      await Booking.create({ userId, eventId }, { transaction });
  
      await Event.update(
        { availableTickets: event.availableTickets - 1 },
        { where: { id: eventId }, transaction }
      );
  
      await transaction.commit();
  
    //   const io = req.app.get('io');
    //   io.emit('bookingUpdate', { message: 'New ticket booked', booking });

      return res.status(201).json({ message: 'Ticket booked successfully!' });
    } catch (error) {
      await transaction.rollback();
      return res.status(500).json({ message: 'Server error', error });
    }
};

const cancelBooking = async (req, res) => {
    const { bookingId } = req.params;
    console.log('bookingId: ', bookingId);
    
    const userId = req.user.id;
    const transaction = await sequelize.transaction();

    try {
        const booking = await Booking.findOne({
            where: { id: bookingId, userId },
            transaction,
            lock: transaction.LOCK.UPDATE, 
        });
        
        if (!booking) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Booking not found' });
        }

        const event = await Event.findOne({
            where: { id: booking.eventId }, 
            transaction,
        });

        if (!event) {
            await transaction.rollback();
            return res.status(500).json({ message: 'Associated event not found' });
        }


        await booking.destroy({ transaction });

        await Event.update(
            { availableTickets: event.availableTickets + 1 },
            { where: { id: event.id }, transaction }
        );

        await transaction.commit();

        // const io = req.app.get('io');
        // io.emit('bookingUpdate', { message: 'Booking canceled', bookingId });

        return res.status(200).json({ message: 'Booking canceled successfully!' });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

  const getUserBookings = async (req, res) => {
    try {
      const userId = req.user.id;
      console.log('userId: ', userId);
  
      const bookings = await Booking.findAll({
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['name']
          },
          {
            model: Event,
            as: 'event',
            attributes: ['name', 'date']
          }
        ],
      });
  
      return res.status(200).json({ bookings });
    } catch (error) {
      console.error(error); 
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

  
module.exports = { bookTicket, getUserBookings, cancelBooking };