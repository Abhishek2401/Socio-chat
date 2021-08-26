import React, { useContext, useEffect, useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import './Sidebar.css'
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { StateContext } from './StateProvider';

function Sidebar() {

    const [rooms,setRooms] = useState([])
    const [{user},dispatch] = useContext(StateContext)

    useEffect(()=>
    {
        db.collection('Rooms').onSnapshot((snapshot)=>(
            setRooms(snapshot.docs.map((doc)=>(
                {
                    id:doc.id,
                    data:doc.data()
                }
            )))
        ))
    },[]);

    // console.log(rooms);

    return (
        <div className='sidebar'>
            <div className='sidebar-header'>
                <Avatar src={user?.photoURL}/>
                <div className='sidebar-headerRight'>
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>

            <div className='sidebar-search'>
                <div className='sidebar-search-container'>
                    <SearchOutlined/>
                    <input placeholder='Search'/>
                </div>
            </div>

            <div className='sidebar-chats'>
                <SidebarChat addNewchat/>
                {rooms.map((room)=>(
                    <SidebarChat 
                        key={room.id}
                        id={room.id}
                        name={room.data.name}
                    />
                ))}
                
                {/* <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/> */}
            </div>
        </div>
    )
}

export default Sidebar
