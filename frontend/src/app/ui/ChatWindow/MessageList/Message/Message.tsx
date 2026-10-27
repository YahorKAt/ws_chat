import type {MessageType} from "../../../../../common/types/chat";
import s from './Message.module.css'

type Props = {
    message: MessageType
    isOwn: boolean
}
export const Message = ({message, isOwn}: Props) => {
    return (
        <div className={`${s.messageWrapper} ${isOwn ? s.own : s.other}`}>
            <div className={s.bubble}>
                {!isOwn && <div className={s.userName}>{message.user.name}</div>}
                <div className={s.text}>{message.message}</div>
            </div>
        </div>
    );
};