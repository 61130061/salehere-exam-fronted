import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Room ({ name }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) navigate('/');
  }, [name])

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '100px' }}>
        <h1>Name: {name}</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '30px', gap: '20px' }}>
        <button onClick={() => navigate('/room/create')} className="normal">Create Room</button>
        <button onClick={() => navigate('/room/join')} className="text">Join Room</button>
      </div>
    </>
  )
}