import { useMainStore } from "@/app/store";
import { DateMedic } from "@/app/(DashboardLayout)/types/Dates/DateMedic/dateMedic";
import { createColumnHelper } from "@tanstack/react-table";
import { Typography } from "@mui/material";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import TableApp from "@/app/components/tableApp/tableApp";
import { useState } from "react";
import React from "react";
import formatedDate from "@/utils/function/formatedDate";

const columnHelper = createColumnHelper<DateMedic>();
const DateMedicTable = () => {
    const {dateMedicList} = useMainStore();
    const [columnFilters, setColumnFilters] = React.useState<any>([]);
    const columns = React.useMemo(() => [
        columnHelper.accessor('patientName', {
            header: 'Nombre',
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.accessor('doctorName', {
            header: 'Doctor',
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.accessor('dateMedicDate', {
            header: 'Fecha',
            cell: (info) => (
                <Typography>
                {formatedDate(info.getValue())},
                </Typography>
            ),
        }),
        columnHelper.accessor('hospitalMedicDate', {
            header: 'Fecha Hospital',
            cell: (info) => (
                <Typography>
                {formatedDate(info.getValue())},
                </Typography>
            ),
        }),
        columnHelper.accessor('consultationTypeId', {
            header: 'Tipo Consulta',
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
       
    ], []);

    const {table, globalFilter, setGlobalFilter} = useTableWithSearch({
        data: dateMedicList,
        columns,
        columnsToSearch: ['patientName', 'doctorName', 'dateMedicDate', 'hospitalMedicDate', 'consultationTypeId'],
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
export default DateMedicTable;