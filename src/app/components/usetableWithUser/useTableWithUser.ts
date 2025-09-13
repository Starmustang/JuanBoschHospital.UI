import * as React from 'react';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';
import { useGlobalTableFilter } from './useTableGlobalFilter';

/**
 * A reusable hook to setup a TanStack Table instance with global search.
 * @template T
 * @param {Object} params
 * @param {T[]} params.data - The table data
 * @param {any[]} params.columns - The column definitions
 * @param {string[]} params.columnsToSearch - The columns to use for global search
 * @param {Object} [params.options] - Additional options to pass to useReactTable
 * @returns {object} { table, globalFilter, setGlobalFilter }
 */
export function useTableWithSearch<T>({ data, columns, columnsToSearch, options = {} }: {
  data: T[];
  columns: any[];
  columnsToSearch: string[];
  options?: Record<string, any>;
}) {
  const { globalFilter, setGlobalFilter, globalFilterFn } = useGlobalTableFilter(columnsToSearch);

  // Extract state and handlers from options to avoid conflicts
  const { state: externalState, onGlobalFilterChange, ...restOptions } = options;

  const table = useReactTable({
    data,
    columns,
    globalFilterFn,
    state: {
      globalFilter,
      ...externalState
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    ...restOptions,
  });

  return { table, globalFilter, setGlobalFilter };
}
