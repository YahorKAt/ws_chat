import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import {registerChatHandlers} from "./socket/chat-handler";
import type {ClientToServerEvents, ServerToClientEvents} from "./types/chat";

const PORT = 3000;

const app = express();
const server = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
    cors: {
        origin: "http://localhost:5173", // Разрешаем доступ фронтенду
        methods: ["GET", "POST"],
    }
});

app.get('/', (req, res) => {
    res.send('<h1>Server Start</h1>');
});

io.on('connection', (socket) => {
    registerChatHandlers(io, socket);
});

server.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`);
});