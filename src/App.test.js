import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('shows the button when input is filled', () => {
  const { getByRole, queryByRole } = render(<App />);
  const input = getByRole('textbox');
  let button = queryByRole('button');

  expect(button).toBeNull();

  fireEvent.change(input, { target: { value: 'Hello, world!' } });

  button = queryByRole('button');
  expect(button).toBeInTheDocument();
});