import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Room ({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate])

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '100px' }}>
        <h1>Name: {user?.name}</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '30px', gap: '20px' }}>
        <button onClick={() => navigate('/room/create')} className="normal">Create Room</button>
        <button onClick={() => navigate('/room/join')} className="text-button">Join Room</button>
      </div>
    </>
  )
}