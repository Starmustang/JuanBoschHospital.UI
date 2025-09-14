import { useMainStore } from "@/app/store";
import { createColumnHelper } from "@tanstack/react-table";
import { ArsEnsurance } from "@/app/(DashboardLayout)/types/Ars/ArsEnsurance/arsEnsurance";
import { Typography } from "@mui/material";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import TableApp from "@/app/components/tableApp/tableApp";
import React from "react";

const ArsEnsuranceTable = () => {
    const {arsEnsuranceList} = useMainStore();
    const [columnFilters, setColumnFilters] = React.useState<any>([]);
    const columnHelper = createColumnHelper<ArsEnsurance>();
    const columns = [
        columnHelper.accessor("arsEnsuranceId", {
            header: "ID",
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.accessor("ensuranceName", {
            header: "Nombre",
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.accessor("ensurancePhone", {
            header: "Telefono",
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.accessor("ensuranceEmail", {
            header: "Email",
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        
        
    ]
    const {table, globalFilter, setGlobalFilter} = useTableWithSearch({
        data: arsEnsuranceList,
        columns,
        columnsToSearch: ['ensuranceName', 'ensurancePhone', 'ensuranceEmail'],
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
export default ArsEnsuranceTable;