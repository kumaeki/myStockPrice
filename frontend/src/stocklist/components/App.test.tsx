import React from 'react';
import { render, screen } from '@testing-library/react';
import StockList from '../StockList';

test('renders learn react link', () => {
    render(<StockList />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
