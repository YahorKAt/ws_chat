import type {Message, TypedSocket, User} from "../types/chat";

export const messages: Message[] = [
    {id: "2456", message: "Hello Viktor", user: {id: 'sad', name: "Dimych"}},
    {id: "3567", message: "Hello Dimych", user: {id: 'dsa', name: "Viktor"}}
]

export const users = new Map<TypedSocket, User>();