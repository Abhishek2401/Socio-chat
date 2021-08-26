import { Avatar } from '@material-ui/core'
import React, { useState,useEffect } from 'react'
import './SidebarChat.css'
import db from './firebase'
import { Link } from 'react-router-dom'

function SidebarChat({id,name,addNewchat}) {

    const [seed,setSeed] = useState('')
    const [messages,setMessages] = useState([])

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000))
    }, [])

    useEffect(()=>{
        db.collection('Rooms').doc(id).collection('ChatInfo').orderBy('timestamp','desc').onSnapshot((snapshot)=>(
            setMessages(snapshot.docs.map((doc)=>(
                doc.data().message
            )))
        ))
    },[id])

    const createChat = () =>{
        const roomName=prompt('Enter the room Name')
        if(roomName)
        {
            db.collection('Rooms').add({
                name:roomName
            })
        }
    }

    return !addNewchat ? (
        <Link to={`/room/${id}`}>
            <div className='sidebarChat'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className='sidebarChat-info'>
                    <h2>{name}</h2>
                    <p>{messages[0]?.slice(0,40)}</p>
                </div>
            </div>
        </Link>
        
    ):(
        <div className='sidebarChat' onClick={createChat}>
            <h3>Add New Chat</h3>
        </div>
    )
}

export default SidebarChat
