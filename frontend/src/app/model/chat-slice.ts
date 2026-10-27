import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {MessageType, UserType} from "../../common/types/chat";

import {api} from "../api/api";

interface ChatState {
    messages: MessageType[];
    typingUsers: UserType[];
    isAutoScrollActive: boolean;
    currentUser: string;
}

const initialState: ChatState = {
    messages: [],
    isAutoScrollActive: true,
    typingUsers: [],
    currentUser: "",
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    selectors: {
        selectMessages: state => state.messages,
        selectIsAutoScrollActive: state => state.isAutoScrollActive,
        selectTypingUsers: state => state.typingUsers,
        selectCurrentUser: state => state.currentUser,
    },
    reducers: (create) => ({
        setMessages: create.reducer<MessageType[]>((state, action) => {
            state.messages = action.payload;
        }),
        addMessage: create.reducer<MessageType>((state, action) => {
            state.messages.push(action.payload);
            state.typingUsers = state.typingUsers.filter(user => user.id !== action.payload.user.id)
        }),
        addTypingUserAdded: create.reducer<UserType>((state, action) => {
            const exists = state.typingUsers.some(user => user.id === action.payload.id);
            if (!exists) {
                state.typingUsers.push(action.payload);
            }
        }),
        removeTypingUser: create.reducer<string>((state, action) => {
            state.typingUsers = state.typingUsers.filter(user => user.id !== action.payload);
        }),
        setAutoScrollActive: create.reducer<boolean>((state, action) => {
            state.isAutoScrollActive = action.payload;
        }),
        setCurrentUser: create.reducer<string>((state, action) => {
            state.currentUser = action.payload;
        }),
    }),
})

// Карта для хранения таймеров на клиенте, чтобы они не плодились
const typingTimers: Record<string, ReturnType<typeof setTimeout>> = {};

export const createConnection = createAsyncThunk(
    'chat/createConnection',
    async (_, {dispatch}) => {
        api.createConnection()
        api.subscribe(
            (messages: MessageType[]) => dispatch(setMessages(messages)),
            (message) => dispatch(addMessage(message)),
            (user) => {
                dispatch(addTypingUserAdded(user))

                if (typingTimers[user.id]) {
                    clearTimeout(typingTimers[user.id]);
                }

                typingTimers[user.id] = setTimeout(() => {
                    dispatch(removeTypingUser(user.id));
                    delete typingTimers[user.id];
                }, 3000);
            },
        )
    }
);

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (text: string) => {
        api.sendMessage(text)
    }
);

export const sendName = createAsyncThunk(
    'chat/sendName',
    async (name: string) => {
        api.sendName(name)
    }
);

export const writeMessage = createAsyncThunk(
    'chat/writeMessage',
    async () => {
        api.writeMessage()
    }
);

export const deleteConnection = createAsyncThunk(
    'chat/deleteConnection',
    async () => {
        Object.values(typingTimers).forEach(clearTimeout);
        api.destroyConnection()
    }
);


export const {
    setMessages,
    addMessage,
    setAutoScrollActive,
    addTypingUserAdded,
    removeTypingUser,
    setCurrentUser
} = chatSlice.actions;
export const {selectMessages, selectIsAutoScrollActive, selectTypingUsers, selectCurrentUser} = chatSlice.selectors
export const chatReducer = chatSlice.reducer;