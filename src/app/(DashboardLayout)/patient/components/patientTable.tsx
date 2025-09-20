"use client";
import { useReactTable } from "@tanstack/react-table";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import { Patient } from "@/app/(DashboardLayout)/types/patient/patient";
import React from "react";
import  TableApp  from "@/app/components/tableApp/tableApp";
import { Typography } from "@mui/material";
import { useMainStore } from "@/app/store";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";

const columnHelper = createColumnHelper<Patient>()

const PatientTable = () => {
    const [columnFilters, setColumnFilters] = React.useState<any>([]);
    const {patientList} = useMainStore();

        const columns = React.useMemo(() => [
        columnHelper.accessor('patientName', {
            header: 'Nombre',
            cell: info => ( 
            <Typography variant="body1">
                {info.getValue()}
            </Typography>),
        }),
        columnHelper.accessor('patientLastName', {
            header: 'Apellido',
            cell: info => ( 
            <Typography variant="body1">
                {info.getValue()}
            </Typography>),
        }),
        columnHelper.accessor('patientIdCard', {
            header: 'Cedula',
            cell: info => (
            <Typography variant="body1">
                {info.getValue()}
            </Typography>),
        }),
        columnHelper.accessor('patientGender', {
            header: 'Genero',
            cell: info => (
            <Typography variant="body1">
                {info.getValue()}
            </Typography>),
        }),
       
    ], []);

    const {table, globalFilter, setGlobalFilter} = useTableWithSearch({
        data: patientList,
        columns,
        columnsToSearch: ["patientName", "patientLastName", "patientIdCard", "patientGender"],       
      });
    return (
        <TableApp table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
    );
};

export default PatientTable;