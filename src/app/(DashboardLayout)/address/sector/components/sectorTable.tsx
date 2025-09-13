import { Sector } from "@/app/(DashboardLayout)/types/Address/sector/sector";
import { createColumnHelper } from "@tanstack/react-table";
import Typography from "@mui/material/Typography";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import { useState } from "react";
import TableApp from "@/app/components/tableApp/tableApp";

const SectorTable = () => {
    const columnHelper = createColumnHelper<Sector>(); 
    const [columnFilters, setColumnFilters] = useState<any>([]);
    const columns = [
        columnHelper.accessor('sectorName', {
            header: 'Nombre',
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.accessor('municipalityName', {
            header: 'Municipio',
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
    ]
    const {table, globalFilter, setGlobalFilter} = useTableWithSearch({
        data: [],
        columns,
        columnsToSearch: ['sectorName', 'municipalityName'],
        options: {
            initialState: {
                columnVisibility: {
                    // Default all columns to visible
                },
               
              },
            onColumnFiltersChange: setColumnFilters,
            debugTable: true,
            debugHeaders: true,
            debugColumns: false,
        }
    })
    return (
        <TableApp table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
    );
}
export default SectorTable;
