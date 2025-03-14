const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const authRouter = require('./router/authRouter');
const eventRouter = require('./router/eventRouter');
const bookingRouter = require('./router/bookingRouter');
const http = require('http');
const socketIo = require('socket.io');

require('./models/association');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

app.set('io', io);


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/event', eventRouter);
app.use('/booking', bookingRouter);

sequelize.sync({ force: false }) 
  .then(() => console.log('Database synchronized'))
  .catch(err => console.error('Database sync error:', err));

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
