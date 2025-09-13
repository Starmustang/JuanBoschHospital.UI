"use client";
import { createColumnHelper } from "@tanstack/react-table";
import { Municipality } from "@/app/(DashboardLayout)/types/Address/municipality/municipality";
import { useMainStore } from "@/app/store";
import { Typography } from "@mui/material";
import TableApp from "@/app/components/tableApp/tableApp";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import React from "react";
const columnHelper = createColumnHelper<Municipality>();
const MunicipalityTable = () => {
    const { municipalityList } = useMainStore();
    const [columnFilters, setColumnFilters] = React.useState<any>([]);
    const columns = [
        columnHelper.accessor('municipalityName', {
            header: 'Nombre',
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.accessor('provinceName', {
            header: 'Provincia',
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
    ]
    const {table, globalFilter, setGlobalFilter} = useTableWithSearch({
        data: municipalityList,
        columns,
        columnsToSearch: ["municipalityName", "provinceName"],
        options: {
            initialState: {
                columnVisibility: {
                    
                }
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
export default MunicipalityTable;