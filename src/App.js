import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";

import Room from './pages/Room';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import ChatRoom from './pages/ChatRoom';

const App = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');

  return (
    <div className="app">
      <div style={{ backgroundColor: '#ffffff' }}>Proxumer</div>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home name={name} setName={setName} />} />
            <Route path="room" element={<Room name={name} />} />
            <Route path="room/create" element={<CreateRoom name={name} />} />
            <Route path="room/join" element={<JoinRoom name={name} />} />
            <Route path="room/id/:id" element={<ChatRoom />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
};

const Home = ({ name, setName }) => {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Enter your name</h1>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        {name && name !== '' &&
          <button onClick={() => navigate('/room')} className="normal">Confirm</button>
        }
      </div>
    </>
  )
}

export default App;
