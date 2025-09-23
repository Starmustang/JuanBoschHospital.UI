import { useMainStore } from "@/app/store";
import { DateMedic } from "@/app/(DashboardLayout)/types/Dates/DateMedic/dateMedic";
import { createColumnHelper } from "@tanstack/react-table";
import { Typography } from "@mui/material";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import TableApp from "@/app/components/tableApp/tableApp";
import React, { useEffect, useMemo, useState } from "react";
import TableActions from '@/app/components/tableApp/tableActions';
import DeleteEntityModal from '@/app/components/modal/DeleteEntityModal';
import formatedDate from "@/utils/function/formatedDate";

const columnHelper = createColumnHelper<DateMedic>();
const DateMedicTable = () => {
        const { dateMedicList, getDateMedicList, handleOpenDateMedicModal, handleOpenDeleteModal, showDeleteModal, handleCloseDeleteModal, deleteDateMedic, selectedDateMedic } = useMainStore();

    useEffect(() => {
        getDateMedicList();
    }, [getDateMedicList]);
    const [columnFilters, setColumnFilters] = React.useState<any>([]);
        const columns = useMemo(() => [
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
       
            columnHelper.display({
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <TableActions
                    onEdit={() => handleOpenDateMedicModal(row.original.dateMedicId)}
                    onDelete={() => handleOpenDeleteModal(row.original.dateMedicId || 0)}
                />
            ),
        }),
    ], [handleOpenDateMedicModal, handleOpenDeleteModal]);

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
                <>
            <TableApp table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            <DeleteEntityModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                apiCall={() => deleteDateMedic(selectedDateMedic)}
                message="¿Está seguro que quiere eliminar esta cita?"
                tittle="Eliminar Cita"
            />
        </>
    );
}
export default DateMedicTable;