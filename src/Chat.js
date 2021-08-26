import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, SearchOutlined } from '@material-ui/icons'
import MoreVert from '@material-ui/icons/MoreVert'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Chat.css'
import db from './firebase'
import { StateContext } from './StateProvider'
import firebase from 'firebase'

function Chat() {

    const [seed,setSeed] = useState('')
    const [msginput,setmsgInput] = useState('')
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState('')
    const [messages, setMessages] = useState([])
    const [{user},dispatch] = useContext(StateContext)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () =>{
        messagesEndRef.current.scrollIntoView({behavior:'smooth'})
    }

    useEffect(()=>{
        db.collection('Rooms').doc(roomId).onSnapshot((snapshot)=>(
            setRoomName(snapshot.data().name)
        ))

        setSeed(Math.floor(Math.random()*5000))

        db.collection('Rooms').doc(roomId).collection('ChatInfo').orderBy('timestamp','asc').onSnapshot((snapshot)=>(
            setMessages(snapshot.docs.map((doc)=>(
                doc.data()
            )))
        ))

    },[roomId])

    useEffect(scrollToBottom,[messages])

    const getMessage = (e)=>{
        setmsgInput(e.target.value)
    }

    const sendMessage = (e) =>{
        e.preventDefault()
        // console.log(msginput);
        db.collection('Rooms').doc(roomId).collection('ChatInfo').add({
            message: msginput,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setmsgInput('')
    }

    return (
        <div className='chat'>
            <div className='chat-header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className='chat-info'>
                    <h3>{roomName}</h3>
                    <p>{`Last Activity at ${new Date(messages[messages.length-1]?.timestamp?.toDate()).toLocaleString()}`}</p>
                </div>
                <div className='chat-headerRight'>
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className='chat-body'>
                {messages.map((message)=>(
                    <p key={messages.timestamp} className={`chat-message ${message.name === user.displayName && 'chat-reciever'}`}>
                        <span className='chat-name'>{message.name}</span>
                        {message.message}
                        <span className='chat-timestamp'>{new Date(message.timestamp?.toDate()).toLocaleString()}</span>
                    </p>
                ))}
                <div ref={messagesEndRef}/>
            </div>
            <div className='chat-footer'>
                <IconButton>
                    <InsertEmoticon/>
                </IconButton>
                <form>
                    <input type='text' placeholder='Enter message' value={msginput} onChange={getMessage}></input>
                    <button type='submit' onClick={sendMessage}> Send Message</button>
                </form>
                <IconButton>
                    <Mic/>
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
