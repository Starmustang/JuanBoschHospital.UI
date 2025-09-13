import * as React from 'react';
import { makeGlobalFilterFn } from './filterUtils';

/**
 * React hook for setting up a global filter function and state for TanStack Table.
 * @param columnsToSearch Array of column keys to search
 * @returns { globalFilter, setGlobalFilter, globalFilterFn }
 */
export function useGlobalTableFilter(columnsToSearch: string[]) {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const globalFilterFn = React.useMemo(() => makeGlobalFilterFn(columnsToSearch), [columnsToSearch]);
  return { globalFilter, setGlobalFilter, globalFilterFn };
}
