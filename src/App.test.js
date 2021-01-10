import React from 'react';
import { act, render } from '@testing-library/react';
import App from './App';
import * as api from "./util/Api";

test('Renders the app component', async () => {
  api.getTodos = () => new Promise(resolve => resolve([{id: "1", text: "Mocked Todo", done: false}]))
  const { findByText } = render(<App />);
  const todoText = await findByText("Mocked Todo");
  expect(todoText).toBeInTheDocument();
});
