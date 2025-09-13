"use client";
import { Province } from "@/app/(DashboardLayout)/types/Address/province/province";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useMainStore } from "@/app/store";
import Typography from "@mui/material/Typography";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import TableApp from "@/app/components/tableApp/tableApp";
const columnHelper = createColumnHelper<Province>();

const ProvinceTable = () => {
    const [columnFilters, setColumnFilters] = useState<any>([]);
    const { provinceList, getProvinceList } = useMainStore();
    useEffect(() => {
        getProvinceList();
    }, [getProvinceList]);

    const columns = [
        columnHelper.accessor('provinceName', {
            header: 'Nombre',
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
            
        }),
        columnHelper.accessor('countryName', {
            header: 'Pais',
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
    ]
    const {table, globalFilter, setGlobalFilter} = useTableWithSearch({
        data: provinceList,
        columns,
        columnsToSearch: ['provinceName', 'countryName'],
        options: {
            initialState: {
                columnVisibility: {                    
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
export default ProvinceTable;