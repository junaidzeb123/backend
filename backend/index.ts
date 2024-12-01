import express from 'express';
import { createServer } from 'node:http';
import cors from 'cors';
import { Server } from 'socket.io';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import { errorMiddleware } from './middlewares/error.middleware';
import './config/moongose';
import { CONFIG } from './config/environmentvariable';
import { string } from 'zod';
import userModel from './models/user.model';
import { send } from 'node:process';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use(errorMiddleware);
app.get("/", (req, res) => {
  res.send("eh");
});

interface Chat {
  socketId: string;
  userId: string;
}

interface ConnectedClients {
  [chatId: string]: Chat[];
}

let connectedClients: ConnectedClients = {};

function isUserInChat(chatId: string, userId: string): boolean {
  // console.log(chatId,userId,connectedClients);

  return connectedClients[chatId]?.some((chat) => chat.userId === userId) ?? false;
}

io.on('connection', (socket) => {


  socket.on("setup", (data) => {
    const { id } = data;
    socket.join(id);
    socket.emit("connected");
    console.log(`user ${data.userName} ${id} connected with socket id ${socket.id}`);

  });

  socket.on("enterroom", (room) => {
    socket.join(room);
    console.log("user joined room", room);
  });

  socket.on('new_message', (data) => {
    try {

      const { chat, message, sender } = data;
      for (const user of chat.chat.users) {
        if (user === sender) continue;
        socket.in(user).emit('receive_message', { sender, text: message });
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("typing", (data) => {
    const { chat, sender } = data;
    if(chat && sender)
    for (const user of chat.chat.users) {
      if (user === sender) continue;
      socket.in(user).emit('typing', { sender });
    }
  });


  socket.on("typingStop", (data) => {
    const { chat, sender } = data;
    if(chat && sender) 
    for (const user of chat.chat.users) {
      if (user === sender) continue;
      socket.in(user).emit('typingStop', { sender });
    }
  })

  socket.on('disconnect', () => {
    console.log('Connection closed with socket ID:', socket.id);
  });

});

app.use(errorMiddleware);
server.listen(CONFIG.PORT, () => {
  console.log(`Server is running on port ${CONFIG.PORT}`);
});




