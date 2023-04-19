import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";

import backgroundImg from "./assets/images/bg.jpg";
import logoImg from "./assets/images/logo.png";

import Room from './pages/Room';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import ChatRoom from './pages/ChatRoom';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="app" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div style={{ marginBottom: '15px'}}>
        <img src={logoImg} height="40px" />
      </div>
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
      <div className="credit">Submitted by Warunyu Hematulin <a href="https://github.com/61130061/salehere-exam-fronted.git" target="_blank">GitHub</a></div>
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
        <h1>ชื่อของคุณ</h1>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
      </div>
      {name && name !== '' &&
        <div className="fade-in" style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <button onClick={onConfirm} className="normal">ยืนยัน</button>
        </div>
      }
    </>
  )
}

export default App;
