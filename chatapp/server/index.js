

const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = process.env.PORT || 4500;

const users = {};

app.use(cors());
app.get("/", (req, res) => {
  res.send("ITS WORKING");
});

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New Connection");

  socket.on('joined', ({ user }) => {
    users[socket.id] = { name: user, online: true };
    console.log(`${user} has joined `);

    // Send welcome message to the newly connected user
    socket.emit('welcome', { user: "Admin", message: `Welcome to the chat, ${users[socket.id].name} `});

    // Broadcast userJoined message to other clients
    socket.broadcast.emit('userJoined', { user: users[socket.id].name, message: ` has joined` });

    // Broadcast the updated list of active users to everyone
    updateActiveUsers();
  });

  socket.on('message', ({ message, id }) => {
    io.emit('sendMessage', { user: users[id].name, message, id });
  });

  socket.on('disconnect', () => {
    if (users[socket.id]) {
      const disconnectedUser = users[socket.id].name;
      users[socket.id].online = false;
      io.emit('leave', { user: disconnectedUser, message: ` has left` });

      // Broadcast the updated list of active users to everyone
      updateActiveUsers();
    }
  });

  // Initial broadcast of active users when a new user connects
  updateActiveUsers();

  function updateActiveUsers() {
    io.emit('activeUsers', Object.values(users).filter(u => u.online).map(u => u.name));
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});






// // server.js   important
// const http = require("http");
// const express = require("express");
// const cors = require("cors");
// const socketIO = require("socket.io");

// const app = express();
// const port = process.env.PORT || 4500;

// const users = {};

// app.use(cors());
// app.get("/", (req, res) => {
//   res.send("ITS WORKING");
// });

// const server = http.createServer(app);
// const io = socketIO(server);

// io.on("connection", (socket) => {
//   console.log("New Connection");

//   socket.on('joined', ({ user }) => {
//     users[socket.id] = { name: user, online: true };
//     console.log(`${user} has joined `);

//     // Send welcome message to the newly connected user
//     socket.emit('welcome', { user: "Admin", message: `Welcome to the chat, ${users[socket.id].name} `});

//     // Broadcast userJoined message to other clients
//     socket.broadcast.emit('userJoined', { user: users[socket.id].name, message: ` has joined` });

//     // Broadcast the updated list of active users to everyone
//     io.emit('activeUsers', Object.values(users).filter(user => user.online).map(user => user.name));
//   });

//   socket.on('message', ({ message, id }) => {
//     io.emit('sendMessage', { user: users[id].name, message, id });
//   });

//   socket.on('disconnect', () => {
//     if (users[socket.id]) {
//       const disconnectedUser = users[socket.id].name;
//       users[socket.id].online = false;
//       io.emit('leave', { user: disconnectedUser, message: ` has left` });

//       // Broadcast the updated list of active users to everyone
//       io.emit('activeUsers', Object.values(users).filter(user => user.online).map(user => user.name));
//     }
//   });

//   // Initial broadcast of active users when a new user connects
//   socket.emit('activeUsers', Object.values(users).filter(user => user.online).map(user => user.name));
// });

// server.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });



// // server.js
// const http = require("http");
// const express = require("express");
// const cors = require("cors");
// const socketIO = require("socket.io");

// const app = express();
// const port = process.env.PORT || 4500;

// const users = {};

// app.use(cors());
// app.get("/", (req, res) => {
//   res.send("ITS WORKING");
// });

// const server = http.createServer(app);
// const io = socketIO(server);

// io.on("connection", (socket) => {
//   console.log("New Connection");

//   socket.on('joined', ({ user }) => {
//     users[socket.id] = user;
//     console.log(`${user} has joined `);

//     // Send welcome message to the newly connected user
//     socket.emit('welcome', { user: "Admin", message: `Welcome to the chat, ${users[socket.id]} `});

//     // Broadcast userJoined message to other clients
//     socket.broadcast.emit('userJoined', { user: users[socket.id], message: ` has joined` });
//   });

//   socket.on('message', ({ message, id }) => {
//     io.emit('sendMessage', { user: users[id], message, id });
//   });

//   socket.on('disconnect', () => {
//     if (users[socket.id]) {
//       io.emit('leave', { user: users[socket.id], message: ` has left` });
//       console.log(`${users[socket.id]} has left`);
//       delete users[socket.id];
//     }
//   });
// });

// server.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });






// // server.js
// const http = require("http");
// const express = require("express");
// const cors = require("cors");
// const socketIO = require("socket.io");

// const app = express();
// const port = process.env.PORT || 4500;

// const users = {};

// app.use(cors());
// app.get("/", (req, res) => {
//   res.send("ITS WORKING");
// });

// const server = http.createServer(app);
// const io = socketIO(server);

// io.on("connection", (socket) => {
//   console.log("New Connection");

//   socket.on('joined', ({ user }) => {
//     users[socket.id] = user;
//     console.log(`${user} has joined `);

//     // Send welcome message to the newly connected user
//     socket.emit('welcome', { user: "Admin", message: `Welcome to the chat, ${users[socket.id]} `});

//     // Broadcast userJoined message to other clients
//     socket.broadcast.emit('userJoined', { user: "Admin", message: ` ${users[socket.id]} has joined` });
//   });

//   socket.on('message', ({ message, id }) => {
//     io.emit('sendMessage', { user: users[id], message, id });
//   });

//   socket.on('disconnect', () => {
//     if (users[socket.id]) {
//       socket.broadcast.emit('leave', { user: "Admin", message: `${users[socket.id]} has left` });
//       console.log(`user left`);
//       delete users[socket.id];
//     }
//   });
// });

// server.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });




















// const http=require("http");
// const express =require("express");
// const cors = require("cors");
// const socketIO = require("socket.io");

// const app=express();
// const port= process.env.PORT || 4500;


// const users=[{}];

// app.use(cors());  
// app.get("/",(req,res)=>{
//     res.send(" ITS WORKING");
// })

// const server=http.createServer(app);

// const io=socketIO(server);

// io.on("connection",(socket)=>{//jb io coonection server on ho
//     console.log("New Connection");

//     socket.on('joined',({user})=>{//iska use hua hai ek common group provide krega or user join hoga
//           users[socket.id]=user;
//           console.log(`${user} has joined `);   //server
//           socket.broadcast.emit('userJoined',{user:"Admin",message:` ${users[socket.id]} has joined`});   //client side pr other joini ko show hoga
//           socket.emit('welcome',{user:"Admin",message:`Welcome to the chat,${users[socket.id]} `})    //cleint ko show hoga
//     })

//     socket.on('message',({message,id})=>{//iske through user msg bhejega client ko
//         io.emit('sendMessage',{user:users[id],message,id});
//     })

//     socket.on('disconnect',()=>{
//           socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]}  has left`});   //client side show hoha jb user dissconnect hoga
//         console.log(`user left`);
//     })
// });


// server.listen(port,()=>{
//     // console.log(`Working`);
//     console.log(`Server is running on http://localhost:${port}`);
// })




