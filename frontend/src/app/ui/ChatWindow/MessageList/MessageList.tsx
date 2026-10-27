import * as React from "react";
import type {MessageType} from "../../../../common/types/chat";
import {Message} from "./Message/Message";

type Props = {
    messages: MessageType[];
    currentUser: string;
}

export const MessageList = React.memo(({messages, currentUser}: Props) => {

    return (
        <>
            {messages.map((m: MessageType) => (
                <Message key={m.id} message={m} isOwn={m.user.name === currentUser}/>
            ))}
        </>
    );
});