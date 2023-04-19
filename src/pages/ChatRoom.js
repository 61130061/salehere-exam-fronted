import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Message from '../components/Message';
import MyMessage from '../components/MyMessage';

export default function ChatRoom ({ user }) {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!user) navigate('/');
    else onFetchData();
  }, [id, user, navigate])

  const mockMessage = [
    { text: 'hello', sender: 'me' },
    { text: 'hi', sender: 'test' }
  ]

  const onFetchData = () => {
    if (!id) throw Error ('Missing input')

    const mutation = `
      query GetChatRoom($id: ID!) {
        chatRoomById (id: $id) {
          id
          name
          messages {
            id
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
        query: mutation,
        variables: {
          id
        },
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data.data) {
          console.log(data.data);
          setData(data.data.chatRoomById)
        } else {
          // TODO: Show message room already created or goto this room
        }
      })

  }

  return (
    <div style={{ position: 'relative', padding: '20px', height: '90%' }}>
      {data &&
        <>
          <div>
            <h1 style={{ marginTop: '0px', marginBottom: '0px' }}>Chatroom: {data.name}</h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', height: '95%' }}>
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
        </>
      }
    </div>
  )
}