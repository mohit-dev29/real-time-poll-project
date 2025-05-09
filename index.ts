import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import pollRoutes from './routes/poll.routes';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

mongoose.connect('mongodb://localhost:36015/realtime-poll');

app.use(express.json());
app.use('/api/polls', pollRoutes);
app.set('io', io);

io.on('connection', (socket) => {
  socket.on('join-poll', (pollId) => {
    socket.join(pollId);
  });
});

server.listen(4000);