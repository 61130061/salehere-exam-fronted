import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Room from './Room';

test('Page render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter initialEntries={['/room']}>
      <Room user={{name: "test", id: "123"}} />
    </MemoryRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});

test('Create and join button render on page', () => {
  const { getByLabelText } = render(
    <MemoryRouter initialEntries={['/room']}>
      <Room user={{ name: "test", id: "123" }} />
    </MemoryRouter>
  );
  let createButton = getByLabelText('create-button');
  let joinButton = getByLabelText('join-button');

  expect(createButton).toBeInTheDocument();
  expect(joinButton).toBeInTheDocument();
})

test("Render the right user's name", () => {
  const name = "test"

  const { getByLabelText } = render(
    <MemoryRouter initialEntries={['/room']}>
      <Room user={{ name, id: "123" }} />
    </MemoryRouter>
  );

  let renderName = getByLabelText('user-name'); 
  expect(renderName.innerHTML).toBe('คุณ '+name);
})