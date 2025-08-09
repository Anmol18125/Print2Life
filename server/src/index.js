require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const analyticsRoutes = require('../routes/analytics.routes');
const analyticsSocket = require('../sockets/analytics.socket');

const app = express();
const server = http.createServer(app);

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ['GET', 'POST']
  }
});

// middleware
app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: CLIENT_ORIGIN
}));

// routes
app.use('/api', analyticsRoutes);

// connect db & start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/arhorizon';

mongoose.connect(MONGO_URI, { })
  .then(() => {
    console.log('MongoDB connected');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error', err);
    server.listen(PORT, () => console.log(`Server running (no DB) on port ${PORT}`));
  });

// attach socket handlers
analyticsSocket(io);
