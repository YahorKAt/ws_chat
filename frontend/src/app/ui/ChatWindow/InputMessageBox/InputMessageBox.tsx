import * as React from "react";
import {useRef, useState} from "react";
import {useAppDispatch} from "../../../../common/hooks";
import {sendMessage, writeMessage} from "../../../model/chat-slice";
import s from './InputMessageBox.module.css'

export const InputMessageBox = () => {
    const [text, setText] = useState("");
    const lastTypingTimeRef = useRef<number>(0);
    const dispatch = useAppDispatch();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onClickHandler();
        } else {
            // Отправляем сигнал "печатает" не чаще чем раз в 1.5 секунды
            const now = Date.now();
            if (now - lastTypingTimeRef.current > 1500) {
                dispatch(writeMessage());
                lastTypingTimeRef.current = now;
            }
        }
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }

    const onClickHandler = () => {
        if (!text.trim()) return;
        dispatch(sendMessage(text))
        setText("");
    }

    return (
        <div className={s.inputContainer}>
            <textarea
                className={s.textarea}
                onKeyDown={handleKeyDown}
                onChange={onChangeHandler}
                value={text}
                placeholder="Введите сообщение..."
                rows={1}
            />
            <button className={s.sendButton} onClick={onClickHandler} disabled={!text.trim()}>
                ➤
            </button>
        </div>
    );
};