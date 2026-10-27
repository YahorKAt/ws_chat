import type {Socket} from "socket.io-client";

export type UserType = {
    id: string;
    name: string;
};

export type MessageType = {
    id: string;
    message: string;
    user: UserType;
};

// 1. Описываем типы событий точно так же, как на бэкенде, но "зеркально"
// То, что сервер отправляет (.emit), клиент здесь слушает (.on)
export interface ServerToClientEvents {
    'init-messages': (messages: MessageType[]) => void;
    'new-message': (message: MessageType) => void;
    'user-typing-message': (user: UserType) => void;
}

// То, что клиент отправляет (.emit), сервер там слушает (.on)
export interface ClientToServerEvents {
    'client-message': (text: string) => void;
    'client-name': (name: string) => void;
    'client-write-message': () => void;
}

export type ChatSocket = Socket<ServerToClientEvents, ClientToServerEvents>;