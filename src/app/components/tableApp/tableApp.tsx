import {
    Box,
    Divider,
    Grid,
    IconButton,
    MenuItem,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
  } from '@mui/material';
  import {
    flexRender,
    Table as ReactTableType,
  } from '@tanstack/react-table';
  
  import BlankCard from '@/app/components/shared/BlankCard';
  import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
  import CustomSelect from '@/app/components/forms/theme-elements/CustomSelect';
  import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
  } from '@tabler/icons-react';
import { Fragment } from 'react';
  
  interface GenericTableProps<T> {
    table: ReactTableType<T>;
    renderSubComponent?: (row: any) => React.ReactNode;
  }
  
  export function TableApp<T>({ table, renderSubComponent }: GenericTableProps<T>) {
    return (
      <BlankCard>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box>
              <TableContainer>
                <Table sx={{ whiteSpace: 'nowrap' }}>
                  <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableCell key={header.id}>
                            <Typography
                              variant="h6"
                              mb={1}
                              className={
                                header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                              }
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
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
                    {table.getRowModel().rows.map((row) => (
                      <Fragment key={row.id}>
                        <TableRow
                          sx={{
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 255, 0.1)',
                              cursor: 'pointer',
                            },
                          }}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
  
                        {renderSubComponent && row.getIsExpanded() && (
                          <TableRow>
                            <TableCell colSpan={row.getVisibleCells().length}>
                              {renderSubComponent(row)}
                            </TableCell>
                          </TableRow>
                        )}
                      </Fragment>
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
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body1">
                    {table.getPrePaginationRowModel().rows.length} filas
                  </Typography>
                </Box>
  
                <Box
                  sx={{
                    display: {
                      xs: 'block',
                      sm: 'flex',
                    },
                  }}
                  alignItems="center"
                  gap={1}
                >
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography variant="body1">Página</Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                    </Typography>
                  </Stack>
  
                  <Stack direction="row" alignItems="center" gap={1}>
                    | Ir a página:
                    <CustomTextField
                      type="number"
                      min="1"
                      max={table.getPageCount()}
                      defaultValue={table.getState().pagination.pageIndex + 1}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                        table.setPageIndex(page);
                      }}
                      sx={{ width: 70 }}
                    />
                  </Stack>
  
                  <CustomSelect
                    value={table.getState().pagination.pageSize}
                    onChange={(e: any) => {
                      table.setPageSize(Number(e.target.value));
                    }}
                    size="small"
                  >
                    {[10, 15, 20, 25].map((pageSize) => (
                      <MenuItem key={pageSize} value={pageSize}>
                        {pageSize}
                      </MenuItem>
                    ))}
                  </CustomSelect>
  
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
            </Box>
          </Grid>
        </Grid>
      </BlankCard>
    );
  }
  