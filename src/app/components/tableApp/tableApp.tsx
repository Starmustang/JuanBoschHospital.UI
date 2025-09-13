import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Divider,
  Stack,
  Box,
  IconButton,
  MenuItem,
  Collapse,
  Menu,
  Checkbox,
  FormControlLabel,
  Button,
  Tooltip,
  Popover,
  Paper,
  TextField,
  InputAdornment,
  Grid2 as Grid,
} from '@mui/material';
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconSettings,
} from '@tabler/icons-react';
import { Table as ReactTable, flexRender, Column } from '@tanstack/react-table';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import CustomSelect from '../forms/theme-elements/CustomSelect';

import BlankCard from '../shared/BlankCard';
import { IconSearch } from '@tabler/icons-react';

export const ACTIONS_COLUMN = 'actions';
// Helper function to get a user-friendly display name for a column
const getColumnDisplayName = <T,>(column: Column<T, unknown>): string => {
  // First check if we have a header function that returns a string
  if (typeof column.columnDef.header === 'function') {
    try {
      // Execute the header function - this works because most header functions
      // in this codebase are simple arrow functions that return a string
      // Example: header: () => 'Nombre'
      const headerResult = (column.columnDef.header as Function)();
      if (typeof headerResult === 'string') {
        return headerResult;
      }
    } catch (error) {
      // If there's an error executing the header function, continue to fallbacks
      console.error('Error executing header function:', error);
    }
  } else if (typeof column.columnDef.header === 'string') {
    // Direct string header
    return column.columnDef.header;
  }

  // If we couldn't get the header text directly,
  // check if there's a meta property with display name
  const meta = column.columnDef.meta as any;
  if (meta && typeof meta.displayName === 'string') {
    return meta.displayName;
  }

  // If all else fails, format the column ID to be more readable
  // Convert camelCase to Title Case with spaces
  return column.id.charAt(0).toUpperCase() + column.id.slice(1).replace(/([A-Z])/g, ' $1');
};

interface CustomTableProps<T> {
  globalFilter?: string;
  setGlobalFilter?: (value: string) => void;
  globalFilterPlaceholder?: string;
  table: ReactTable<T>;
  renderExpandedRow?: (row: T) => React.ReactNode;
  paddingCell?: number;
  tableId?: string; // Unique identifier for the table to save column preferences
  SkeletonComponent?: React.ReactNode;
  isLoading?: boolean;
  simplifiedControls?: boolean; // New prop to hide pagination controls when space is limited
}

const TableApp = <T,>({
  table,
  renderExpandedRow,
  paddingCell,
  tableId = 'default-table',
  isLoading,
  SkeletonComponent,
  globalFilter,
  setGlobalFilter,
  globalFilterPlaceholder,
  simplifiedControls = false, // Default to showing all controls
}: CustomTableProps<T>) => {
  // Use state to manage the page input value
  const [pageInputValue, setPageInputValue] = React.useState<string>(
    (table.getState().pagination.pageIndex + 1).toString(),
  );

  // Column visibility menu state
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Handle opening the column visibility menu
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the column visibility menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Load saved column visibility preferences from localStorage when component mounts
  React.useEffect(() => {
    try {
      const savedVisibility = localStorage.getItem(`table-columns-${tableId}`);
      if (savedVisibility) {
        const parsedVisibility = JSON.parse(savedVisibility);
        // Apply saved visibility state to the table
        table.setColumnVisibility(parsedVisibility);
      }
    } catch (error) {
      console.error('Error loading column visibility preferences:', error);
    }
  }, [tableId, table]);

  // Save column visibility preferences to localStorage when they change
  React.useEffect(() => {
    try {
      const currentVisibility = table.getState().columnVisibility;
      localStorage.setItem(`table-columns-${tableId}`, JSON.stringify(currentVisibility));
    } catch (error) {
      console.error('Error saving column visibility preferences:', error);
    }
  }, [table.getState().columnVisibility, tableId]);

  // Update the page input value when the page changes
  React.useEffect(() => {
    setPageInputValue((table.getState().pagination.pageIndex + 1).toString());
  }, [table.getState().pagination.pageIndex]);
  return (
    <>
      {/* Global Search Filter */}
      {typeof setGlobalFilter === 'function' && (
        <Grid container spacing={1} mb={2}>
          <Grid size={4}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              value={globalFilter || ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder={globalFilterPlaceholder || 'Buscar...'}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size="1.1rem" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
        </Grid>
      )}

      <BlankCard>
        <TableContainer>
          <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      sx={{
                        width: header.column.getSize(),
                        padding: paddingCell,
                      }}
                    >
                      <Typography
                        variant="h6"
                        mb={1}
                        className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {(() => {
                          const sortState = header.column.getIsSorted();
                          if (sortState === 'asc') return ' 🔼';
                          if (sortState === 'desc') return ' 🔽';
                          return null;
                        })()}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {isLoading
                ? SkeletonComponent ||
                  // Default Skeleton Placeholder
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      {table.getAllColumns().map((col, i) => (
                        <TableCell key={`skeleton-cell-${i}`}>
                          <Box
                            sx={{
                              backgroundColor: '#e0e0e0',
                              height: 20,
                              borderRadius: 1,
                              animation: 'pulse 1.5s infinite ease-in-out',
                            }}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : table.getRowModel().rows.map((row) => (
                    <React.Fragment key={row.id}>
                      <TableRow>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            align={cell.column.id === ACTIONS_COLUMN ? 'right' : 'left'}
                            sx={{ padding: paddingCell }}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow key={`expanded-${row.id}`}>
                        <TableCell colSpan={table.getAllLeafColumns().length} sx={{ padding: 0 }}>
                          <Collapse in={row.getIsExpanded()} timeout={500}>
                            <Box sx={{ py: row.getIsExpanded() ? 2 : 0 }}>
                              {renderExpandedRow && renderExpandedRow(row.original)}
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider />

        <Stack
          gap={1}
          p={3}
          alignItems="center"
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
        >
          {/* Column visibility toggle button */}
          <Tooltip title="Configurar columnas visibles">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ mr: 2 }}
              aria-controls={open ? 'column-visibility-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <IconSettings size="1.25rem" />
            </IconButton>
          </Tooltip>

          {/* Column visibility popover */}
          <Popover
            id="column-visibility-menu"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Paper sx={{ p: 2, maxHeight: 300, overflow: 'auto', width: 250 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Columnas visibles
              </Typography>
              <Divider sx={{ mb: 1 }} />
              {table.getAllLeafColumns().map((column) => {
                // Skip rendering toggle for the actions column if it exists
                if (column.id === ACTIONS_COLUMN) return null;

                return (
                  <FormControlLabel
                    key={column.id}
                    control={
                      <Checkbox
                        checked={column.getIsVisible()}
                        onChange={column.getToggleVisibilityHandler()}
                      />
                    }
                    label={getColumnDisplayName(column)}
                    sx={{ display: 'block', mb: 0.5 }}
                  />
                );
              })}
              <Divider sx={{ my: 1 }} />
              <Stack direction="row" justifyContent="space-between">
                <Button
                  size="small"
                  onClick={() => table.toggleAllColumnsVisible(true)}
                  variant="outlined"
                >
                  Mostrar todo
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    // Hide all except essential columns (like actions)
                    const essentialColumns = [ACTIONS_COLUMN];
                    // Properly type the columnsToToggle object as Record<string, boolean>
                    const columnsToToggle: Record<string, boolean> = {};

                    table.getAllLeafColumns().forEach((column) => {
                      columnsToToggle[column.id] = essentialColumns.includes(column.id);
                    });

                    table.setColumnVisibility(columnsToToggle);
                  }}
                  variant="outlined"
                  color="error"
                >
                  Ocultar todo
                </Button>
              </Stack>
            </Paper>
          </Popover>
          
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body1">
              {table.getPrePaginationRowModel().rows.length} Filas
            </Typography>
          </Box>

          
          {!simplifiedControls && (
            <Box display={{ xs: 'block', sm: 'flex' }} alignItems="center" gap={1}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="body1">Pagina</Typography>
                <Typography variant="body1" fontWeight={600}>
                  {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" gap={1}>
                | Ir a pagina:
                <CustomTextField
                  type="number"
                  min="1"
                  size="small"
                  max={table.getPageCount()}
                  value={pageInputValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    // Update the input value state
                    setPageInputValue(e.target.value);
                    // Update the table page if the value is valid
                    if (e.target.value) {
                      const page = Number(e.target.value) - 1;
                      if (page >= 0 && page < table.getPageCount()) {
                        table.setPageIndex(page);
                      }
                    }
                  }}
                />
              </Stack>

              <CustomSelect
                size="small"
                value={table.getState().pagination.pageSize}
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 15, 20, 25].map((pageSize) => (
                  <MenuItem key={pageSize} value={pageSize}>
                    {pageSize}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Box>
          )}

          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="small"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <IconChevronsLeft />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <IconChevronLeft />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <IconChevronRight />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <IconChevronsRight />
            </IconButton>
          </Box>
        </Stack>
      </BlankCard>
    </>
  );
};

export default TableApp;