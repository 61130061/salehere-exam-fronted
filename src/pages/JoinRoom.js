import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function JoinRoom ({ user }) {
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate])

  const onJoinRoom = () => {
    const mutation = `
      query ChatRoom($name: String!) {
        chatRoomByName(name: $name) {
          id
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
          name: roomName
        },
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data.data) {
          navigate('/room/id/' + data.data.chatRoomByName.id);
        } else {
          // TODO: Show message room already created or goto this room
        }
      })
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Join Rooom</h1>
        <input value={roomName} onChange={(e) => setRoomName(e.target.value)} type="text" placeholder="Room's Name" />
      </div>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
        <button onClick={() => navigate('../room')} className="text-button">Back</button>
        <button onClick={onJoinRoom} className="normal">Join</button>
      </div>
    </>
  )
}