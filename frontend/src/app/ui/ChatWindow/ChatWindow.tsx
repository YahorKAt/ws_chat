import {useEffect, useRef} from "react";
import * as React from "react";
import {useAppDispatch, useAppSelector} from "../../../common/hooks";
import {
    selectCurrentUser,
    selectIsAutoScrollActive, selectMessages, selectTypingUsers,
    setAutoScrollActive
} from "../../model/chat-slice";
import {MessageList} from "./MessageList/MessageList";
import {TypingIndicator} from "./TypingIndicator/TypingIndicator";
import s from './ChatWindow.module.css'

export const ChatWindow = () => {
    const messages = useAppSelector(selectMessages);
    const typingUsers = useAppSelector(selectTypingUsers);
    const currentUser = useAppSelector(selectCurrentUser);
    const isAutoScrollActive = useAppSelector(selectIsAutoScrollActive);

    const dispatch = useAppDispatch();
    const messagesAnchorRef = useRef<HTMLDivElement>(null);

    const onScrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget;
        const isAtBottom = (element.scrollHeight - element.clientHeight) - element.scrollTop <= 20;
        dispatch(setAutoScrollActive(isAtBottom));
    }

    useEffect(() => {
        if (isAutoScrollActive) {
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"});
        }
    }, [messages, isAutoScrollActive, typingUsers]);

    return (
        <div className={s.chatWindow}>
            <div className={s.messagesContainer} onScroll={onScrollHandler}>
                <MessageList messages={messages} currentUser={currentUser}/>
                <TypingIndicator/>
                <div ref={messagesAnchorRef} className={s.scrollAnchor}/>
            </div>
        </div>
    );
};