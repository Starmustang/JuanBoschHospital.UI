import { DateDoctor } from "@/app/(DashboardLayout)/types/Dates/DateDoctor/dateDoctor";
import TableApp from "@/app/components/tableApp/tableApp";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import { useMainStore } from "@/app/store";
import formatedDate from "@/utils/function/formatedDate";
import { Typography } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useEffect } from "react";
import TableActions from "@/app/components/tableApp/tableActions";
import DeleteEntityModal from "@/app/components/modal/DeleteEntityModal";

const DateDoctorTable = () => {
    const { dateDoctorList, getDateDoctorList, handleOpenDateDoctorModal, handleOpenDeleteModal, showDeleteModal, handleCloseDeleteModal, deleteDateDoctor, selectedDateDoctor } = useMainStore();

    useEffect(() => {
        getDateDoctorList();
    }, [getDateDoctorList]);

    const [columnFilters, setColumnFilters] = React.useState<any>([]);
    const columnHelper = createColumnHelper<DateDoctor>();
    const columns = React.useMemo(() => [
        columnHelper.accessor('dateDoctorSintoms', {
            header: 'Sintomas',
            cell: (info) => <Typography>{info.getValue()}</Typography>
        }),
        columnHelper.accessor('dateDoctorIndicatedAnalisis', {
            header: 'Analisis Indicado',
            cell: (info) => <Typography>{info.getValue()}</Typography>
        }),
        columnHelper.accessor('dateDoctorTreatment', {
            header: 'Tratamiento',
            cell: (info) => <Typography>{info.getValue()}</Typography>
        }),
        columnHelper.accessor('dateDoctorNotes', {
            header: 'Notas',
            cell: (info) => <Typography>{info.getValue()}</Typography>
        }),
        columnHelper.accessor('dateDoctorNextDate', {
            header: 'Fecha Siguiente',
            cell: (info) => <Typography>{formatedDate(info.getValue())}</Typography>
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <TableActions
                    onEdit={() => handleOpenDateDoctorModal(row.original.dateDoctorId)}
                    onDelete={() => handleOpenDeleteModal(row.original.dateDoctorId)}
                />
            ),
        }),
    ], [handleOpenDateDoctorModal, handleOpenDeleteModal]);

    const { table, globalFilter, setGlobalFilter } = useTableWithSearch({
        data: dateDoctorList,
        columns,
        columnsToSearch: ['dateDoctorSintoms', 'dateDoctorIndicatedAnalisis', 'dateDoctorTreatment', 'dateDoctorNotes', 'dateDoctorNextDate'],
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
    });

    return (
        <>
            <TableApp table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            <DeleteEntityModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                apiCall={() => deleteDateDoctor(selectedDateDoctor)}
                message="¿Esta seguro que quiere eliminar esta cita?"
                tittle="Eliminar Cita"
            />
        </>
    );
}
export default DateDoctorTable;