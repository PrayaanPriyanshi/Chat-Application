
import React, { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';
import './Chat.css';
import { user } from '../Join';
import sendIcon from '../../../images/send.png';
import Message from '../../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';

const ENDPOINT = 'http://localhost:4500/';

const Chat = () => {
  const [id, setid] = useState('');
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  const sendMessage = () => {
    const message = document.getElementById('chatInput').value;
    socket.emit('message', { message, id });
    document.getElementById('chatInput').value = '';
  };

  useEffect(() => {
    const socketInstance = socketIo(ENDPOINT, { transports: ['websocket'] });

    socketInstance.on('connect', () => {
      alert('Connected');
      setid(socketInstance.id);
    });

    socketInstance.emit('joined', { user });

    socketInstance.on('welcome', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      updateActiveUsers(data.user, true);
    });

    socketInstance.on('userJoined', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      updateActiveUsers(data.user, true);
    });

    socketInstance.on('leave', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      updateActiveUsers(data.user, false);
    });

    // Handling the 'activeUsers' event to update the list
    socketInstance.on('activeUsers', (users) => {
      setActiveUsers(users.filter(u => u !== user.name)); // Exclude the current user
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('sendMessage', (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
        console.log(data.user, data.message, data.id);
      });

      return () => {
        socket.off('sendMessage');
      };
    }
  }, [socket, messages]);

  const updateActiveUsers = (userName, isJoining) => {
    setActiveUsers((prevUsers) => {
      if (isJoining && userName !== 'Admin' && userName !== user.name) {
        return [...new Set([...prevUsers, userName])];
      } else if (!isJoining && userName !== 'Admin') {
        return prevUsers.filter((activeUser) => activeUser !== userName);
      }
      return prevUsers;
    });
  };

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>C CHAT</h2>
        </div>
        <div className="activeUsers">
          <p>Active Users: {activeUsers.join(', ')}</p>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Message
              key={i}
              user={item.id === id ? '' : item.user}
              message={item.message}
              classs={item.id === id ? 'right' : 'left'}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            onKeyPress={(event) => (event.key === 'Enter' ? sendMessage() : null)}
            type="text"
            id="chatInput"
          />
          <button onClick={sendMessage} className="sendBtn">
            <img src={sendIcon} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;





// // Chat.js   important file
// import React, { useEffect, useState } from 'react';
// import socketIo from 'socket.io-client';
// import './Chat.css';
// import { user } from '../Join';
// import sendIcon from '../../../images/send.png';
// import Message from '../../Message/Message';
// import ReactScrollToBottom from 'react-scroll-to-bottom';

// const ENDPOINT = 'http://localhost:4500/';
// let socket;

// const Chat = () => {
//   const [id, setid] = useState('');
//   const [messages, setMessages] = useState([]);

//   const sendMessage = () => {
//     const message = document.getElementById('chatInput').value;
//     socket.emit('message', { message, id });
//     document.getElementById('chatInput').value = '';
//   };

//   useEffect(() => {
//     socket = socketIo(ENDPOINT, { transports: ['websocket'] });

//     socket.on('connect', () => {
//       alert('Connected');
//       setid(socket.id);
//     });

//     socket.emit('joined', { user });

//     socket.on('welcome', (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//       console.log(data.user, data.message);
//     });

//     socket.on('userJoined', (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//       console.log(data.user, data.message);
//     });

//     socket.on('leave', (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//       console.log(data.user, data.message);
//     });

//     return () => {
//       socket.disconnect(); // Disconnect the socket when the component unmounts
//     };
//   }, []);

//   useEffect(() => {
//     socket.on('sendMessage', (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//       console.log(data.user, data.message, data.id);
//     });

//     return () => {
//       socket.off('sendMessage');
//     };
//   }, [messages]);

//   return (
//     <div className="chatPage">
//       <div className="chatContainer">
//         <div className="header">
//           <h2>C CHAT</h2>
//         </div>
//         <ReactScrollToBottom className="chatBox">
//           {messages.map((item, i) => (
//             <Message
//               key={i}
//               user={item.id === id ? '' : item.user}
//               message={item.message}
//               classs={item.id === id ? 'right' : 'left'}
//             />
//           ))}
//         </ReactScrollToBottom>
//         <div className="inputBox">
//           <input
//             onKeyPress={(event) => (event.key === 'Enter' ? sendMessage() : null)}
//             type="text"
//             id="chatInput"
//           />
//           <button onClick={sendMessage} className="sendBtn">
//             <img src={sendIcon} alt="Send" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;










//*****************************************IMPORTANT FILE*************************************** */

// import React, { useEffect, useState } from 'react';
// import socketIo from "socket.io-client";
// import "./Chat.css";
// import {user} from '../Join'
// import sendIcon from '../../../images/send.png';
// import Message from '../../Message/Message';
// import ReactScrollToBottom from "react-scroll-to-bottom";

// let socket;

// const ENDPOINT = "http://localhost:4500/";

// const Chat = () => {
//     const [id, setid] = useState("");
//     const [messages, setMessages] = useState([]);

//     const sendMessage = () => {
//         const message = document.getElementById('chatInput').value;
//         socket.emit('message', { message, id });
//         document.getElementById('chatInput').value = "";
//     }

//     useEffect(() => {
//         socket = socketIo(ENDPOINT, { transports: ['websocket'] });

//         socket.on('connect', () => { 
//             alert('Connected');  
//             setid(socket.id);
//         });

//         socket.emit('joined', { user });

//         socket.on('welcome', (data) => {
//             setMessages([...messages, data]);
//             console.log(data.user, data.message);
//         });

//         socket.on('userJoined', (data) => {
//             setMessages([...messages, data]);
//             console.log(data.user, data.message);
//         });

//         socket.on('leave', (data) => {
//             setMessages([...messages, data]);
//             console.log(data.user, data.message);
//         });

//         return () => {
//             socket.off();
//         };
//     }, []); 

//     useEffect(() => {
//         socket.on('sendMessage', (data) => {
//             setMessages([...messages, data]);
//             console.log(data.user, data.message, data.id);
//         });

//         return () => {
//             socket.off('sendMessage');
//         };
//     }, [messages]);

//     return (
//         <div className="chatPage">
//             <div className="chatContainer">
//                 <div className="header">
//                     <h2>C CHAT</h2>
//                 </div>
//                 <ReactScrollToBottom className="chatBox">
//                     {messages.map((item, i) => (
//                         <Message key={i} user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />
//                     ))}
//                 </ReactScrollToBottom>
//                 <div className="inputBox">
//                     <input onKeyPress={(event) => event.key === 'Enter' ? sendMessage() : null} type="text" id="chatInput" />
//                     <button onClick={sendMessage} className="sendBtn"><img src={sendIcon} alt="Send" /></button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Chat;










