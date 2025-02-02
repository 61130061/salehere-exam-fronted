import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';

import Message from '../components/Message';
import MyMessage from '../components/MyMessage';

export default function ChatRoom ({ user }) {
  const [data, setData] = useState(null);
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const mcRef = useRef(null);

  useEffect(() => {
    const socket = io('http://localhost:4000/');

    socket.on('chatroom-' + id, (message) => {
      console.log(message);
      onFetchData();
    })

    return () => {
      socket.disconnect();
    };
  }, [])

  useEffect(() => {
    if (!user) navigate('/');
    else onFetchData();
  }, [id, user, navigate])

  const onFetchData = () => {
    if (!id) throw Error ('Missing input')

    const query = `
      query GetChatRoom($id: ID!) {
        chatRoomById (id: $id) {
          id
          name
          messages {
            id
            sender {
              id
              name
            }
            text
          }
        }
      }
    `;

    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: {
          id
        },
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data.data) {
          setData(data.data.chatRoomById)
          const container = mcRef.current;
          container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        } else {
          // TODO: Show message room already created or goto this room
        }
      })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      const payload = {
        roomId: data.id,
        senderId: user.id,
        text
      }

      const mutation = `
        mutation SendMessage($roomId: ID!, $senderId: ID!, $text: String!) {
          sendMessage (roomId: $roomId, senderId: $senderId, text: $text) {
            id
            text
          }
        }
      `;

      fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: mutation,
          variables: payload,
        })
      })
        .then(r => r.json())
        .then(data => {
          if (data.data) {
            setText('')
            onFetchData();
          } else {
            // TODO: Show message room already created or goto this room
          }
        })
    }
  }

  return (
    <div style={{ position: 'relative', padding: '20px', height: '90%' }}>
      {data &&
        <>
          <div>
            <h1 style={{ marginTop: '0px', marginBottom: '0px' }}>ห้อง {data.name}</h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', height: '95%' }}>
            <div ref={mcRef} className="message-container">
              {data.messages.length > 0 ? data.messages.map((d, i) =>
                d.sender.id === user.id ?
                <MyMessage key={i} data={d} />:
                <Message key={i} data={d} />
            ) :
              <div className="no-message">No message on this chatroom.</div>
            }
            </div>
            <div style={{ position: 'relative' }}>
              <input value={text} onKeyDown={handleKeyDown} onChange={(e) => setText(e.target.value)} className="message" type="text" />
              <div className="send-tip">Enter เพื่องส่ง</div>
            </div>
          </div>
        </>
      }
    </div>
  )
}