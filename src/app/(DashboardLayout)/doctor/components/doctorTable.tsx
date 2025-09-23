"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Doctor } from "../../types/Doctor/Doctor";
import Typography from "@mui/material/Typography";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import { useMainStore } from "@/app/store";
import React, { useEffect, useState } from "react";
import TableApp from "@/app/components/tableApp/tableApp";
import TableActions from "@/app/components/tableApp/tableActions";
import DeleteEntityModal from "@/app/components/modal/DeleteEntityModal";

const DoctorTable = () => {
    const { doctorList, getDoctorList, handleOpenDeleteModal, handleOpenDoctorModal, showDeleteModal, handleCloseDeleteModal, deleteDoctor, selectedDoctor } = useMainStore();

    useEffect(() => {
        getDoctorList();
    }, [getDoctorList]);

    const [columnFilters, setColumnFilters] = useState<any>([]);
    const columnHelper = createColumnHelper<Doctor>();
    const columns = React.useMemo(() => [
        columnHelper.accessor('doctorName', {
            header: 'Nombre',
            cell: (info) => <Typography>{info.getValue()}</Typography>
        }),
        columnHelper.accessor('doctorLastName', {
            header: 'Apellido',
            cell: (info) => <Typography>{info.getValue()}</Typography>
        }),
        columnHelper.accessor('doctorPhone', {
            header: 'Telefono',
            cell: (info) => <Typography>{info.getValue()}</Typography>
        }),
        columnHelper.accessor('doctorEmail', {
            header: 'Email',
            cell: (info) => <Typography>{info.getValue()}</Typography>
        }),
        columnHelper.accessor('doctorIdCard', {
            header: 'Cedula',
            cell: (info) => <Typography>{info.getValue()}</Typography>
        }),
        columnHelper.accessor('doctorPassport', {
            header: 'Pasaporte',
            cell: (info) => <Typography>{info.getValue()}</Typography>
        }),
        columnHelper.accessor('doctorSpeciality', {
            header: 'Especialidad',
            cell: (info) => <Typography>{info.getValue()}</Typography>
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <TableActions
                    onEdit={() => handleOpenDoctorModal(row.original.doctorId)}
                    onDelete={() => handleOpenDeleteModal(row.original.doctorId)}
                />
            ),
        }),
    ], [handleOpenDoctorModal, handleOpenDeleteModal]);

    const { table, globalFilter, setGlobalFilter } = useTableWithSearch({
        data: doctorList,
        columns,
        columnsToSearch: ['doctorName', 'doctorLastName', 'doctorPhone', 'doctorEmail', 'doctorIdCard', 'doctorPassport', 'doctorSpeciality'],
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
    });

    return (
        <>
            <TableApp table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            <DeleteEntityModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                apiCall={() => deleteDoctor(selectedDoctor)}
                message="¿Esta seguro que quiere eliminar este doctor?"
                tittle="Eliminar Doctor"
            />
        </>
    );
}
export default DoctorTable;
