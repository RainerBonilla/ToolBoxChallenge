import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the Table component to avoid network calls and heavy rendering
jest.mock('../components/Table', () => {
  return function MockedTable() {
    return <div data-testid="mock-table">Mocked Table</div>;
  };
});


describe('App component', () => {
  it('renders the navbar brand and the Table component', () => {
    render(<App />);

    // Navbar brand
    expect(screen.getByText(/ToolBox Challenge: Files/i)).toBeInTheDocument();

    // Mocked Table is rendered
    expect(screen.getByTestId('mock-table')).toBeInTheDocument();
  });
});
