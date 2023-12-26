 import socketIO from 'socket.io-client'
import Join from './component/join/Join';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './component/join/Chat/Chat';
 const ENDPOINT="http://localhost:4500/"; //hmme socket is server se milegga
const socket=socketIO(ENDPOINT,{transports:['websocket']});

function App() {
   socket.on("connected",()=>{
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Join />} />
          <Route path='/chat'  element={<Chat></Chat>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

