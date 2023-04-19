import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Message from '../components/Message';
import MyMessage from '../components/MyMessage';

export default function ChatRoom ({ name }) {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // if (!name) navigate('/');
  }, [name])

  const mockMessage = [
    { text: 'hello', sender: 'me' },
    { text: 'hi', sender: 'test' }
  ]

  return (
    <div style={{ position: 'relative', padding: '20px', height: '90%' }}>
      <div>
        <h1 style={{ marginTop: '0px', marginBottom: '0px' }}>Chatroom: {id}</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', height: '95%'}}>
        <div className="message-container">
          {mockMessage.map((d, i) =>
            <Message key={i} data={d} />
          )}
        </div>
        <div style={{ position: 'relative' }}>
          <input className="message" type="text" />
          <div className="send-tip">Press Enter to send</div>
        </div>
      </div>
    </div>
  )
}