import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";

import Room from './pages/Room';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import ChatRoom from './pages/ChatRoom';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="app">
      <div style={{ backgroundColor: '#ffffff' }}>Proxumer</div>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home setUser={setUser} />} />
            <Route path="room" element={<Room user={user} />} />
            <Route path="room/create" element={<CreateRoom user={user} />} />
            <Route path="room/join" element={<JoinRoom user={user} />} />
            <Route path="room/id/:id" element={<ChatRoom user={user} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
};

const Home = ({ setUser }) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const onConfirm = () => {
    const mutation = `
      mutation GetUser($name: String!) {
        user(name: $name) {
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
          name
        },
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data.data) {
          setUser(data.data.user)
          navigate('/room');
        } else {
          // TODO: Show message room already created or goto this room
        }
      })
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Enter your name</h1>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        {name && name !== '' &&
          <button onClick={onConfirm} className="normal">Confirm</button>
        }
      </div>
    </>
  )
}

export default App;
