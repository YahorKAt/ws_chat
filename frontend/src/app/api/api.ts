import {io} from "socket.io-client";
import type {ChatSocket, MessageType, UserType} from "../../common/types/chat";

export const api = {
    socket: null as null | ChatSocket,

    createConnection: () => {
        if (api.socket) return
        api.socket = io('http://localhost:3000');
    },

    subscribe: (initMessagesHandler: (messages: MessageType[]) => void,
                newMessageSentHandler: (messages: MessageType) => void,
                userTypingHandler: (user: UserType) => void) => {
        api.socket?.on('init-messages', initMessagesHandler);
        api.socket?.on('new-message', newMessageSentHandler);
        api.socket?.on('user-typing-message', userTypingHandler);
    }
    ,

    sendMessage: (text: string) => {
        api.socket?.emit('client-message', text)
    },

    sendName: (name: string) => {
        api.socket?.emit('client-name', name)
    },

    writeMessage: () => {
        api.socket?.emit('client-write-message')
    },

    destroyConnection() {
        this.socket?.disconnect();
        this.socket = null;
    }
}