import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';
import type { Column, DataTableProps } from './types';

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

// Wrap generic component with a concrete props type for Storybook typing
const UserDataTable = (props: DataTableProps<User>) => (
  <DataTable<User> {...props} />
);

const meta: Meta<typeof UserDataTable> = {
  title: 'Components/DataTable',
  component: UserDataTable,
  args: {
    loading: false,
    selectable: true,
  },
};
export default meta;

type Story = StoryObj<typeof UserDataTable>;

export const Default: Story = {
  args: {
    data,
    columns,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
  },
};

export const NonSelectable: Story = {
  args: {
    data,
    columns,
    selectable: false,
  },
};
