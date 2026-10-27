import {useAppSelector} from "../../../../common/hooks";
import type {UserType} from "../../../../common/types/chat";
import {selectCurrentUser, selectTypingUsers} from "../../../model/chat-slice";
import s from './TypingIndicator.module.css'

export const TypingIndicator = () => {
    const typingUsers = useAppSelector(selectTypingUsers);
    const currentUser = useAppSelector(selectCurrentUser);

    const otherTypingUsers = typingUsers.filter((user: UserType) => user.name !== currentUser);

    if (otherTypingUsers.length === 0) return null;

    return (
        <div className={s.typingContainer}>
            <div className={s.typingDots}>
                <span></span><span></span><span></span>
            </div>
            <span className={s.typingText}>
                {otherTypingUsers.map(u => u.name).join(', ')} печатает...
            </span>
        </div>
    );
};