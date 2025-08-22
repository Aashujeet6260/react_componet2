
export interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export interface Column<T extends Record<string, unknown>> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}
