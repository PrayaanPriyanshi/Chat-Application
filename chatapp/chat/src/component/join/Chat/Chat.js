
import React, { useEffect, useState } from 'react';
import socketIo from "socket.io-client";
import "./Chat.css";
import {user} from '../Join'
import sendIcon from '../../../images/send.png';
import Message from '../../Message/Message';
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;

const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
    const [id, setid] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";
    }

    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            alert('Connected');
            setid(socket.id);
        });

        socket.emit('joined', { user });

        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        });

        socket.on('userJoined', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        });

        socket.on('leave', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        });

        return () => {
            socket.off();
        };
    }, []); 

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message, data.id);
        });

        return () => {
            socket.off('sendMessage');
        };
    }, [messages]);

    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>C CHAT</h2>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => (
                        <Message key={i} user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />
                    ))}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input onKeyPress={(event) => event.key === 'Enter' ? sendMessage() : null} type="text" id="chatInput" />
                    <button onClick={sendMessage} className="sendBtn"><img src={sendIcon} alt="Send" /></button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
