import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RateReviewOutlinedIcon  from '@material-ui/icons/RateReviewOutlined';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';


function Sidebar() {
    const user = useSelector(selectUser);
    const [chats, setChats] = useState([]);

    useEffect(()=> {
        db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc=> ({
                id: doc.id,
                data: doc.data(),
            })))
        ))
    }, []);

    const addChat = () => {
        const chatName = prompt("輸入聊天名稱");
        if(chatName) {
            db.collection('chats').add({
                chatName: chatName,
            });
        }
        
    };

    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                {/* auth.signOut 登出*/}
                <Avatar onClick={()=>{auth.signOut()}} src={user.photo} className="sidebar__avatar" />

                <div className="sidebar__input">
                    <SearchIcon/>
                    <input placeholder="搜尋"/>
                </div>

                {/* IconButton讓 material-ui 的物件變成可以點擊的 */}
                <IconButton variant="outlined" className="sidebar__inputButton">
                    <RateReviewOutlinedIcon onClick={addChat} />
                </IconButton>
                
            </div>

            <div className="sidebar__chats">
                {chats.map(({id, data: {chatName}}) => (
                    <SidebarChat key={id} id={id} chatName={chatName} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
