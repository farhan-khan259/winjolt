import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the WinJolt homepage', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /amazing prizes/i })).toBeInTheDocument();
});
