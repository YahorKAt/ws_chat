import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../common/hooks";
import {createConnection, deleteConnection, selectCurrentUser} from "../model/chat-slice";
import {ChatWindow} from "./ChatWindow/ChatWindow";
import {InputMessageBox} from "./ChatWindow/InputMessageBox/InputMessageBox";
import {NameInputPanel} from "./ChatWindow/NameInputPanel/NameInputPanel";
import s from './App.module.css'


function App() {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser);

    useEffect(() => {
        dispatch(createConnection())
        return () => {
            dispatch(deleteConnection())
        }
    }, [dispatch])

    return (
        <div className={s.appContainer}>
            <div className={s.chatCard}>
                <ChatWindow />
                <div className={s.inputArea}>
                    {currentUser === '' ? <NameInputPanel /> : <InputMessageBox />}
                </div>
            </div>
        </div>
    )
}

export default App
