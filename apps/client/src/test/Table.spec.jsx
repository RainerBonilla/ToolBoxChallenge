import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TableComponent from '../components/Table';

describe('TableComponent', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('shows loading spinner initially and then renders table rows', async () => {
    const mockData = [
      { file: 'f1', text: 't1', number: '1', hex: 'a1' },
      { file: 'f2', text: 't2', number: '2', hex: 'b2' }
    ];

    global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockData) }));

    render(<TableComponent />);

    // loading spinner visible
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // wait for rows to appear
    await waitFor(() => expect(screen.getByText('f1')).toBeInTheDocument());
    expect(screen.getByText('t2')).toBeInTheDocument();
  });

  it('shows error message when fetch fails', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('network')));

    render(<TableComponent />);

    await waitFor(() => expect(screen.getByText(/error fetching data/i)).toBeInTheDocument());
  });
});
