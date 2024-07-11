const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const socketIo = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/auth');
const jwt = require('jsonwebtoken');
const Chat = require('./models/Chat');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

  
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return next(new Error('Authentication error'));
      socket.user = decoded;
      next();
    });
  } else {
    next(new Error('Authentication error'));
  }
});


io.on('connection', async (socket) => {
  console.log('User connected:', socket.user.id);

  try {
    const messages = await Chat.find().sort({ timestamp: 1 }).populate('user', 'username').exec();
    socket.emit('previousMessages', messages);
  } catch (err) {
    console.error(err);
  }

  // Handle incoming chat messages
  socket.on('message', async (message) => {
    try {
      const chatMessage = new Chat({
        user: socket.user.id,
        text: message,
        timestamp: new Date()
      });

      const savedMessage = await chatMessage.save();
      const populatedMessage = await Chat.findById(savedMessage._id).populate('user', 'username').exec();
      // console.log(populatedMessage.user.username);
      io.emit('message', {
        user: populatedMessage.user.username,
        text: populatedMessage.text,
        timestamp: populatedMessage.timestamp
      });
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.user.id);
  });
});




app.use(express.json());
app.use('/api/auth', authRoutes);


app.use(express.static('public'));


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
