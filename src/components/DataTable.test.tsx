
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { DataTable } from './DataTable';
import type { Column } from './types';

type User = { id: number; name: string; email: string; age: number };

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];

const data: User[] = [
  { id: 1, name: 'Aisha Gupta', email: 'aisha@example.com', age: 28 },
  { id: 2, name: 'Ravi Kumar', email: 'ravi@example.com', age: 34 },
  { id: 3, name: 'Neha Singh', email: 'neha@example.com', age: 23 },
];

describe('DataTable', () => {
  it('renders table with data', () => {
    render(<DataTable<User> data={data} columns={columns} />);
    expect(screen.getByText('Aisha Gupta')).toBeInTheDocument();
    expect(screen.getByText('Ravi Kumar')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<DataTable<User> data={[]} columns={columns} loading />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('sorts by column when header clicked', () => {
    render(<DataTable<User> data={data} columns={columns} />);
    const nameHeader = screen.getByRole('button', { name: /Sort by Name/i });
    fireEvent.click(nameHeader); // asc
    const rows = screen.getAllByRole('row');
    // first data row after header
    expect(rows[1]).toHaveTextContent('Aisha Gupta');
    fireEvent.click(nameHeader); // desc
    expect(rows[1]).toHaveTextContent('Ravi Kumar');
  });

  it('selects rows and calls callback', () => {
    const spy = vi.fn();
    render(<DataTable<User> data={data} columns={columns} selectable onRowSelect={spy} />);
    const firstCheckbox = screen.getByLabelText('Select row 1');
    fireEvent.click(firstCheckbox);
    expect(spy).toHaveBeenCalled();
    const all = screen.getByLabelText('Select all rows');
    fireEvent.click(all);
    expect(spy).toHaveBeenCalled();
  });
});
