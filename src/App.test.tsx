import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
jest.mock('./util/Api');

test('Renders the app component', async () => {
  const { findByText } = render(<App />);
  const todoText = await findByText("Mocked Todo");
});
