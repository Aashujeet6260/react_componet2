import React, { useMemo, useState } from 'react';
import type { Column, DataTableProps } from './types';

type SortOrder = 'asc' | 'desc';

function compareValues(a: unknown, b: unknown, order: SortOrder): number {
  if (a == null && b == null) return 0;
  if (a == null) return order === 'asc' ? -1 : 1;
  if (b == null) return order === 'asc' ? 1 : -1;

  const aVal = typeof a === 'string' ? a.toLowerCase() : a;
  const bVal = typeof b === 'string' ? b.toLowerCase() : b;

  if (aVal < bVal) return order === 'asc' ? -1 : 1;
  if (aVal > bVal) return order === 'asc' ? 1 : -1;
  return 0;
}

export function DataTable<T extends Record<string, unknown>>(props: DataTableProps<T>) {
  const { data, columns, loading = false, selectable = false, onRowSelect } = props;

  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedIndexes, setSelectedIndexes] = useState<Set<number>>(new Set());

  const toggleSort = (column: Column<T>) => {
    if (!column.sortable) return;
    const newKey = column.dataIndex;
    if (sortKey === newKey) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(newKey);
      setSortOrder('asc');
    }
  };

  const sortedData = useMemo<T[]>(() => {
    if (!sortKey) return data;
    const copy = [...data];
    copy.sort((a: T, b: T) => compareValues(a[sortKey], b[sortKey], sortOrder));
    return copy;
  }, [data, sortKey, sortOrder]);

  const emitSelection = (indexes: Set<number>) => {
    if (onRowSelect) {
      const selectedRows = Array.from(indexes).map(i => sortedData[i]).filter(r => r != null);
      onRowSelect(selectedRows);
    }
  };

  const toggleRow = (rowIndex: number) => {
    const next = new Set(selectedIndexes);
    if (next.has(rowIndex)) next.delete(rowIndex); else next.add(rowIndex);
    setSelectedIndexes(next);
    emitSelection(next);
  };

  const allSelected = selectable && sortedData.length > 0 && selectedIndexes.size === sortedData.length;

  const toggleAll = () => {
    if (!selectable) return;
    if (allSelected) {
      const cleared = new Set<number>();
      setSelectedIndexes(cleared);
      emitSelection(cleared);
    } else {
      const filled = new Set<number>(sortedData.map((_, idx) => idx));
      setSelectedIndexes(filled);
      emitSelection(filled);
    }
  };

  const renderHeader = () => (
    <thead>
      <tr>
        {selectable && (
          <th>
            <input
              type="checkbox"
              aria-label="Select all rows"
              checked={allSelected}
              onChange={toggleAll}
            />
          </th>
        )}
        {columns.map((col: Column<T>) => (
          <th key={col.key}>
            {col.sortable ? (
              <button
                type="button"
                onClick={() => toggleSort(col)}
                aria-label={`Sort by ${String(col.title)}`}
              >
                {col.title}
                {sortKey === col.dataIndex ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ''}
              </button>
            ) : (
              <span>{col.title}</span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );

  const renderBody = () => {
    if (loading) {
      return (
        <tbody>
          <tr>
            <td colSpan={(selectable ? 1 : 0) + columns.length}>Loading...</td>
          </tr>
        </tbody>
      );
    }

    if (!sortedData || sortedData.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={(selectable ? 1 : 0) + columns.length}>No data</td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {sortedData.map((row: T, rowIndex: number) => (
          <tr key={rowIndex}>
            {selectable && (
              <td>
                <input
                  type="checkbox"
                  aria-label={`Select row ${rowIndex + 1}`}
                  checked={selectedIndexes.has(rowIndex)}
                  onChange={() => toggleRow(rowIndex)}
                />
              </td>
            )}
            {columns.map((col: Column<T>) => (
              <td key={col.key}>{String(row[col.dataIndex])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <table className="min-w-full border-collapse">
      {renderHeader()}
      {renderBody()}
    </table>
  );
}

export default DataTable;
