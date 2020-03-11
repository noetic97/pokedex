import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

test('renders learn react link', () => {
  const { getByText } = render(<Footer />);
  const linkElement = getByText(/Joe Heitkamp/i);
  expect(linkElement).toBeInTheDocument();
});
