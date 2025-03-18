Event Ticket Booking System API

Tech Stack

Backend: Node.js, Express.js

Database: PostgreSQL (Sequelize)

Authentication: JWT

Features

1. User Authentication

POST /auth/register – Register a new user.

POST /auth/login – Login and receive a JWT token.

2. Event Management (Admin Only)

POST /event/add  – Create an event with a name, date, and total tickets.

GET /event/list  – List all available events.

DELETE /event/:id – Delete an event.

3. Booking System (Concurrency)

POST  /booking/add/:eventid  – Book a ticket (Users can only book once per event).

Implements database transactions to prevent overselling.

GET  /booking/my-bookings-list  – View user’s bookings.

DELETE  /booking/cancel/:bookingId – Refund System - To cancel a booking.

Environment Variables

PORT=3000
JWT_SECRET=secret
JWT_REFRESH_SECRET=refresh

DB_NAME=ticketbooking
DB_USER=postgres
DB_PASS=postgres
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres  

Development Steps

Project Initialization

Set up an Express.js server.

Configured Sequelize ORM for PostgreSQL.

User Authentication

Implemented JWT-based authentication.

Created /register and /login routes.

Event Management

Developed API routes to create, list, and delete events.

Ensured only admin users can manage events.

Ticket Booking System

Implemented ticket booking logic with concurrency control using database transactions.

Ensured users can book only once per event.

Enhancements

Implemented WebSocket for real-time updates.

