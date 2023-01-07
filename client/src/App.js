import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './index.css';
import thumbnail from './assets/video-placeholder.jpg';

setInterval(() => {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    // eslint-disable-next-line no-unused-vars
    sum += i;
  }
}, 2);

function App() {
  const afterChatRef = useRef(null);

  const [messages, setMessages] = useState(null);

  const getMessages = async () => {
    const res = await axios.get('https://dummyjson.com/users?limit=100');
    setMessages(res.data.users);
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    afterChatRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <main>
      <section className='stream'>
        <h2 className='stream-title'>Super Exciting Live Stream</h2>
        <img
          src={thumbnail}
          alt='placeholder'
        ></img>
        <div></div>
      </section>
      <section className='main__chat-section'>
        <h2 className='main__chat-title'>Chat</h2>
        <div className='main__chat-container'>
          {messages &&
            messages.map(message => (
              <div
                className='main__chat__message'
                key={message.id}
              >
                <img
                  className='main__chat__message-image'
                  src={message.image}
                  alt={`${message.firstName} ${message.lastName}`}
                />
                <h3 className='main__chat__message-name'>{`${message.firstName} ${message.lastName} has entered the chat`}</h3>
              </div>
            ))}
          <div ref={afterChatRef}></div>
        </div>
      </section>
    </main>
  );
}

export default App;
