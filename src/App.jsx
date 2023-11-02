import './App.css'
import io from 'socket.io-client';
import SocketIo from './components/Socket'
import { useState } from 'react';


const socket = io.connect("http://localhost:3000")


function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showchat, setShowchat] = useState(false)

  const joinRoom = (e) => {
    e.preventDefault()
    if (username !== '' && room !== '') {
      socket.emit("joinRoom", { room, username })
      setShowchat(true)
    }
  }
  return (
    <div className='App'>
        {!showchat ?
      <div className="joinChatContainer">
             <h3>Join The Chat</h3>
        <input value={username} type="text" placeholder='User Name...' onChange={(e) => setUsername(e.target.value)} />
        <input value={room} type="text" placeholder='Room ID' onChange={(e) => setRoom(e.target.value)} />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      : <SocketIo socket={socket} username={username} room={room} />}
    </div>

  )
}

export default App;