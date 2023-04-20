import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import CreateRoom from './CreateRoom';

test('Page render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter initialEntries={['/room/create']}>
      <CreateRoom user={{name: "test", id: "123"}} />
    </MemoryRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});