"use client";
import { useReactTable } from "@tanstack/react-table";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import { Patient } from "@/app/(DashboardLayout)/types/patient/patient";
import React from "react";
import  TableApp  from "@/app/components/tableApp/tableApp";

const columnHelper = createColumnHelper<Patient>()
const PatientTable = () => {
    const [columnFilters, setColumnFilters] = React.useState<any>([]);

        const columns = React.useMemo(() => [
        columnHelper.accessor('PatientName', {
            header: 'Nombre',
        }),
        columnHelper.accessor('PatientLastName', {
            header: 'Apellido',
        }),
        columnHelper.accessor('PatientIdCard', {
            header: 'Cedula',
        }),
        columnHelper.accessor('PatientGender', {
            header: 'Genero',
        }),
        columnHelper.accessor('PatientDirection.HouseStreet', {
            header: 'Calle',
        }),
        columnHelper.accessor('PatientDirection.HomeNumber', {
            header: 'Numero de casa',
        }),
    ], []);

        const rows = React.useMemo(() => [
        {
            PatientName: 'Juan',
            PatientLastName: 'Bosch',
            PatientGender: 'Masculino',
            PatientDirection: {
                HouseStreet: 'Calle 1',
                HomeNumber: '1',
                AddressId: 1,
            },
            PatientId: 1,
            PatientIdCard: '12345678',
        },
        {
            PatientName: 'Maria',
            PatientLastName: 'Bosch',
            PatientGender: 'Femenino',
            PatientDirection: {
                HouseStreet: 'Calle 2',
                HomeNumber: '2',
                AddressId: 2,
            },
            PatientId: 2,
            PatientIdCard: '12345678',
        },
        {
            PatientName: 'Pedro',
            PatientLastName: 'Bosch',
            PatientGender: 'Masculino',
            PatientDirection: {
                HouseStreet: 'Calle 3',
                HomeNumber: '3',
                AddressId: 3,
            },
            PatientId: 3,
            PatientIdCard: '12345678',
        },
    ], []);

    const table = useReactTable({
        data: rows,
        columns,
        filterFns: {},
        state: {
          columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(), //client side filtering
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        autoResetPageIndex: false,
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
      });
    return (
        <TableApp table={table} />
    );
};

export default PatientTable;