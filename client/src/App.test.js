import { render, screen } from '@testing-library/react';
import App from './App';

test('renders student portal', () => {
  render(<App />);
  const portalElement = screen.getByText(/StudentPortal/i);
  expect(portalElement).toBeInTheDocument();
});
