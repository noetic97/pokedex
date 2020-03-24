import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

test('renders footer text', () => {
  const { getByText } = render(<Footer />);
  const linkElement = getByText(/Joe Heitkamp/i);
  expect(linkElement).toBeInTheDocument();
});
