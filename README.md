
# DataTable Component (React + TypeScript + TailwindCSS + Storybook)

## Features
- Display tabular data
- Column sorting
- Row selection (single highlight via row click, multiple via checkboxes)
- Loading state
- Empty state

## Props
```ts
export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}
```

## Accessibility
- Uses native `<table>` semantics with ARIA attributes for sorting and loading states.
- Keyboard focusable rows with `tabIndex` and `aria-selected` announced.
- Checkbox controls labeled for assistive technologies.

## Responsive Design
- Horizontal scroll container on small screens to avoid layout breaking.

## Getting Started
```bash
npm install
npm run dev
```

## Storybook
```bash
npm run storybook
```

## Tests
```bash
npm run test
```

## Example Usage
See `src/App.tsx` and `src/components/DataTable.stories.tsx`.
