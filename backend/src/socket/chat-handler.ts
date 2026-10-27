import type {Server} from "socket.io";
import {messages, users} from "../db/mock-db";
import type {ClientToServerEvents, Message, ServerToClientEvents, TypedSocket} from "../types/chat";

export const registerChatHandlers = (
    io: Server<ClientToServerEvents, ServerToClientEvents>,
    socket: TypedSocket
) => {
    // Автоматически создаем пользователя при коннекте
    users.set(socket, {id: new Date().getTime().toString() + Math.random(), name: "anonym"});

    // Отправляем стартовую историю
    socket.emit('init-messages', messages);

    socket.on('disconnect', () => {
        users.delete(socket);
    });

    socket.on('client-name', (name) => {
        const user = users.get(socket);
        if (user) user.name = name;
    });

    socket.on("client-write-message", () => {
        socket.broadcast.emit('user-typing-message', users.get(socket));
    });

    socket.on('client-message', (messageText) => {
        const user = users.get(socket);
        if (!user) return;

        const messageItem: Message = {
            id: "msg_" + new Date().getTime() + Math.random(),
            message: messageText,
            user: {id: user.id, name: user.name}
        };

        messages.push(messageItem);
        io.emit('new-message', messageItem);
    });
};