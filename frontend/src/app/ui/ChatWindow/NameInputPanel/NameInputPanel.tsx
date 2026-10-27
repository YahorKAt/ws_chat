import * as React from "react";
import {type ChangeEvent, useState} from "react";
import {useAppDispatch} from "../../../../common/hooks";
import {sendName, setCurrentUser} from "../../../model/chat-slice";
import s from './NameInputPanel.module.css'

export const NameInputPanel = () => {
    const dispatch = useAppDispatch();
    const [nameInput, setNameInput] = useState<string>("");

    const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNameInput(e.target.value);
    }

    const submitName = () => {
        if (!nameInput.trim()) return;
        dispatch(sendName(nameInput))
        dispatch(setCurrentUser(nameInput));
        setNameInput("");
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitName();
        }
    };

    return (
        <div className={s.panel}>
            <h2 className={s.title}>Добро пожаловать в чат!</h2>
            <p className={s.subtitle}>Введите ваше имя, чтобы начать общение</p>
            <div className={s.inputGroup}>
                <input
                    type="text"
                    className={s.input}
                    value={nameInput}
                    onChange={onChangeNameHandler}
                    onKeyDown={handleKeyDown}
                    placeholder="Ваше имя..."
                    autoFocus
                />
                <button className={s.button} onClick={submitName}>Войти</button>
            </div>
        </div>
    );
};