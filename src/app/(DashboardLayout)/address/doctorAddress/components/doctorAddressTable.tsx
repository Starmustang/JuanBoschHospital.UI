import { useMainStore } from "@/app/store";
import { DoctorAddress } from "@/app/(DashboardLayout)/types/Address/doctorAddress/doctorAddress";
import { createColumnHelper } from "@tanstack/react-table";
import { Typography } from "@mui/material";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import TableApp from "@/app/components/tableApp/tableApp";
import React from "react";

const DoctorAddressTable = () => {
    const {doctorAddressList} = useMainStore(); 
    const columnHelper = createColumnHelper<DoctorAddress>();
    const [columnFilters, setColumnFilters] = React.useState<any>([]);
    const columns = [
        columnHelper.accessor('doctorName', {
            header: 'Nombre',
            cell: (info) => {
                <Typography>
                    {info.getValue()}
                </Typography>;
            },
        }),
        columnHelper.accessor('doctorLastName', {
            header: 'Apellido',
            cell: (info) => {
                <Typography>
                    {info.getValue()}
                </Typography>;
            },
        }),
        columnHelper.accessor('doctorPhone', {
            header: 'Telefono',
            cell: (info) => {
                <Typography>
                    {info.getValue()}
                </Typography>;
            },
        }),
        columnHelper.accessor('doctorEmail', {
            header: 'Email',
            cell: (info) => {
                <Typography>
                    {info.getValue()}
                </Typography>;
            },
        }),
        columnHelper.accessor('doctorIdCard', {
            header: 'Cedula',
            cell: (info) => {
                <Typography>
                    {info.getValue()}
                </Typography>;
            },
        })
    ];

    const {table, globalFilter, setGlobalFilter} = useTableWithSearch({
        data: doctorAddressList, 
        columns,
        columnsToSearch: ['doctorName', 'doctorLastName', 'doctorPhone', 'doctorEmail', 'doctorIdCard'],
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
    });
    return (
       <TableApp table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
    )
}
export default DoctorAddressTable;
