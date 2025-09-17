"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Doctor } from "../../types/Doctor/Doctor";
import Typography from "@mui/material/Typography";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import { useMainStore } from "@/app/store";
import { useState } from "react";
import TableApp from "@/app/components/tableApp/tableApp";

const DoctorTable = () => {
    const {doctorList} = useMainStore();
    const columnHelper = createColumnHelper<Doctor>();
    const [columnFilters, setColumnFilters] = useState<any>([]);

    const columns = [
        columnHelper.accessor('doctorName', {
            header: 'Nombre',
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.accessor('doctorLastName', {
            header: 'Apellido',
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.accessor('doctorPhone', {
            header: 'Telefono',
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.accessor('doctorEmail', {
            header: 'Email',
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.accessor('doctorIdCard', {
            header: 'Cedula',
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.accessor('doctorPassport', {
            header: 'Pasaporte',
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.accessor('doctorSpeciality', {
            header: 'Especialidad',
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
    ]
    const {table, globalFilter, setGlobalFilter} = useTableWithSearch({
        data: doctorList,
        columns,
        columnsToSearch: ['doctorName', 'doctorLastName', 'doctorPhone', 'doctorEmail', 'doctorIdCard', 'doctorPassport', 'doctorSpeciality'],
        options: {
            initialState: {
                ColumnVisibility: {

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
export default DoctorTable;
