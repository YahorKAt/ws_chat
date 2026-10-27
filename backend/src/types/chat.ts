import type {Socket} from "socket.io";

export type User = {
    id: string;
    name: string;
}

export type Message = {
    id: string,
    message: string,
    user: User
}

export interface ServerToClientEvents {
    'init-messages': (messages: Message[]) => void;
    'new-message': (message: Message) => void;
    'user-typing-message': (user: User | undefined) => void;
}

export interface ClientToServerEvents {
    'client-name': (name: string) => void;
    'client-write-message': () => void;
    'client-message': (messageText: string) => void;
}

export type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents>;