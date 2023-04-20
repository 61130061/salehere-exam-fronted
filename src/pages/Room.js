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
        <h1 aria-label="user-name">คุณ {user?.name}</h1>
      </div>
      <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '30px', gap: '20px' }}>
        <button aria-label="create-button" onClick={() => navigate('/room/create')} className="normal">สร้างห้องใหม่</button>
        <button aria-label="join-button" onClick={() => navigate('/room/join')} className="text-button">เข้าร่วมแชท</button>
      </div>
    </>
  )
}