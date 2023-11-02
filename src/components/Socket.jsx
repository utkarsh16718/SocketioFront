import { useState, useEffect } from "react"
import ScrollToBottom from "react-scroll-to-bottom";


const SocketIo = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState("")
    const [messages, setMessages] = useState([])

    const sendMessage = async () => {
     
        if (currentMessage !== "") {
            const mess={
                currentMessage,
                username,
                room,
                time: new Date(Date.now()).getHours()
            }
            await socket.emit("send_message", mess);
            setMessages((list) => [...list, mess]);
            setCurrentMessage("");
            console.log(messages);
            
        }

    };
    useEffect(() => {
        socket.on("onMessage", (data) => {
            setMessages(prev => [...prev, data]);
            console.log('useE',messages);
           
        })

    }, [socket])

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messages.map((messageContent,key) => {
                        return (
                            <div
                                className="message"
                                id={username === messageContent.username ? "you" : "other"} key={key}
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.currentMessage}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.username}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input value={currentMessage} type="text" placeholder="Hey Message Me" onChange={e => setCurrentMessage(e.target.value)} />
                <button onClick={sendMessage}>&#9658;</button>
            </div>

        </div>
    )
}

export default SocketIo;