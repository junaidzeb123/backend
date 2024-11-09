import express from 'express';
import { createServer } from 'node:http';
import cors from 'cors';
import { Server } from 'socket.io';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { authorize } from './middlewares/authorize.middleware';
import './config/moongose';
import { CONFIG } from './config/environmentvariable';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  // cors: {
  //   origin: "http://localhost:5173", 
  //   methods: ["GET", "POST"]
  // }
});

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use(errorMiddleware);
app.get("/",  (req, res) => {
    res.send("eh");
});

io.on('connection', (socket) => {
  console.log('Connection established with socket ID:', socket.id);
  socket.on('send_message', (message) => {
    console.log('Received message:', message);
    socket.emit('receive_message', `Message received: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('Connection closed with socket ID:', socket.id);
  });
});

server.listen(CONFIG.PORT, () => {
  console.log(`Server is running on port ${CONFIG.PORT}`);
});



app.use(errorMiddleware);