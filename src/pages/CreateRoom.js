import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateRoom ({ user }) {
  const [roomName, setRoomName] = useState('');
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate])

  const onCreateRoom = () => {
    if (!roomName || roomName === '') {
      return
    }

    const mutation = `
      mutation CreateChatRoom($name: String!) {
        createChatRoom(name: $name) {
          id
          name
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
          setStatus(null);
          navigate('/room/id/'+data.data.createChatRoom.id);
        } else {
          setStatus(data.errors[0].message);
        }
      })
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>สร้างห้องใหม่</h1>
        <input value={roomName} onChange={(e) => setRoomName(e.target.value)} type="text" placeholder="Room's Name" />
        {status &&
          <div className="status">{status}</div>
        }
      </div>
      <div className="fade-in" style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
        <button onClick={() => navigate('../room')} className="text-button">กลับ</button>
        <button onClick={onCreateRoom} className="normal">ยืนยัน</button>
      </div>
    </>
  )
}