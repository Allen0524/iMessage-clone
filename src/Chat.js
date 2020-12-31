import { Avatar, IconButton } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import './Chat.css';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Message from './Message';
import { selectChatId, selectChatName } from './features/chatSlice';
import { useSelector } from 'react-redux';
import db from './firebase';
import firebase from 'firebase';
import { selectUser } from './features/userSlice';

function Chat() {
    const user = useSelector(selectUser);
    const [input, setInput] = useState('');
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(chatId) {
            db.collection('chats').doc(chatId).collection("messages")
            .orderBy('timestamp', 'asc').onSnapshot(snapshot => 
                setMessages(snapshot.docs.map(doc =>({
                    id: doc.id,
                    data: doc.data(),
                })))
            )
        }
    }, [chatId]);

    const sendMessage = (e) => {
        e.preventDefault();
        // Firsebase
        db.collection('chats').doc(chatId).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName,
        })
        setInput("");
    }
    return (
        <div className="chat">
            {/* chat header */}
            <div className="chat__header">
                <div className="chat__header__left">
                    <Avatar/>
                    <h3>{chatName}</h3>
                </div>
                <div className="chat__header__right">
                    <strong>選項</strong>
                </div>
            </div>
            
            {/* chat message */}
            <div className="chat__message">
                {messages.map(({id, data})=>(
                    <Message key={id}  contents={data} />
                ))}
            </div>
            {/* chat input */}
            <div className="chat__input">
                <form>
                    <input 
                        value={input} 
                        onChange={e=>setInput(e.target.value)} 
                        placeholder="Aa" 
                        type="text"/>
                    <button onClick={sendMessage}></button>
                </form>
                <IconButton>
                        <ThumbUpIcon color="primary" />
                </IconButton>                
            </div>
        </div>
    )
}

export default Chat
