import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ChatRoom from './ChatRoom';

test('Page render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter initialEntries={['/room/id/room-id']}>
      <Routes>
        <Route path="/room/id/:id" element={<ChatRoom user={{ name: "test", id: "123" }} />} />
      </Routes>
    </MemoryRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});