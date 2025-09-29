"use client";
import { createColumnHelper } from "@tanstack/react-table";
import { Patient } from "@/app/(DashboardLayout)/types/patient/patient";
import React, { useEffect } from "react";
import TableApp from "@/app/components/tableApp/tableApp";
import { Typography } from "@mui/material";
import { useMainStore } from "@/app/store";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import TableActions from "@/app/components/tableApp/tableActions";
import DeleteEntityModal from "@/app/components/modal/DeleteEntityModal";
import { useUserRole } from "@/app/hooks/useUserRole";
import { PERMISSIONS, hasPermission } from "@/app/utils/permissions";

const PatientTable = () => {
    const { patientList, getPatientList, handleOpenPatientModal, handleOpenDeleteModal, showDeleteModal, handleCloseDeleteModal, deletePatient, selectedPatient } = useMainStore();
    const { userRoles } = useUserRole();

    useEffect(() => {
        getPatientList();
    }, [getPatientList]);

    const columnHelper = createColumnHelper<Patient>();

    const columns = React.useMemo(() => [
        columnHelper.accessor('patientName', {
            header: 'Nombre',
            cell: info => <Typography variant="body1">{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('patientLastName', {
            header: 'Apellido',
            cell: info => <Typography variant="body1">{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('patientIdCard', {
            header: 'Cedula',
            cell: info => <Typography variant="body1">{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('patientGender', {
            header: 'Genero',
            cell: info => <Typography variant="body1">{info.getValue()}</Typography>,
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <TableActions
                    onEdit={() => handleOpenPatientModal(row.original.patientId)}
                    onDelete={() => handleOpenDeleteModal(row.original.patientId || 0)}
                    editPermissions={[PERMISSIONS.PATIENT_UPDATE]}
                    deletePermissions={[PERMISSIONS.PATIENT_DELETE]}
                    showView={false}
                />
            ),
        }),
    ], [handleOpenPatientModal, handleOpenDeleteModal]);

    const { table, globalFilter, setGlobalFilter } = useTableWithSearch({
        data: patientList,
        columns,
        columnsToSearch: ["patientName", "patientLastName", "patientIdCard", "patientGender"],
    });

    return (
        <>
            <TableApp table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            <DeleteEntityModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                apiCall={() => deletePatient(selectedPatient)}
                message="¿Esta seguro que quiere eliminar este paciente?"
                tittle="Eliminar Paciente"
            />
        </>
    );
};

export default PatientTable;