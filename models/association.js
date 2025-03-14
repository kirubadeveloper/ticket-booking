const User = require('./User');
const Booking = require('./Booking');
const Event = require('./Event');

User.hasMany(Booking, {
  foreignKey: 'user_id',
  as: 'bookings'
});

Booking.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Event.hasMany(Booking, { 
    foreignKey: 'event_id',
    as: 'eventBookings'
});
  
Booking.belongsTo(Event, {
    foreignKey: 'event_id',
    as: 'eventBookings'
});