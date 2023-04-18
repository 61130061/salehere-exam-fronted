import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateRoom ({ name }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) navigate('/');
  }, [name])

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Create Rooom</h1>
        <input type="text" placeholder="Room's Name" />
      </div>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
        <button onClick={() => navigate('../room')} className="text">Back</button>
        <button className="normal">Create</button>
      </div>
    </>
  )
}