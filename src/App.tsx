
import React from 'react';
import { DataTable } from './components/DataTable';
import type { Column } from './components/types';

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
};

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

export default function App() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">DataTable Demo</h1>
      <DataTable<User>
        data={data}
        columns={columns}
        loading={false}
        selectable
        onRowSelect={(rows) => console.log('Selected rows', rows)}
      />
    </div>
  );
}
