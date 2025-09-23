import { createColumnHelper } from "@tanstack/react-table";
import { PatientDirection } from "@/app/(DashboardLayout)/types/patient/patientDIrection";
import { Typography } from "@mui/material";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import { useMainStore } from "@/app/store";
import TableApp from "@/app/components/tableApp/tableApp";
import React, { useEffect } from "react";
import TableActions from "@/app/components/tableApp/tableActions";
import DeleteEntityModal from "@/app/components/modal/DeleteEntityModal";

const PatientDirectionTable = () => {
    const { patientDirectionList, getPatientDirectionList, handleOpenPatientDirectionModal, handleOpenDeleteModal, showDeleteModal, handleCloseDeleteModal, deletePatientDirection, selectedPatientDirection } = useMainStore();

    useEffect(() => {
        getPatientDirectionList();
    }, [getPatientDirectionList]);

    const columnHelper = createColumnHelper<PatientDirection>();
    const columns = React.useMemo(() => [
        columnHelper.accessor("countryName", {
            header: "Pais",
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor("provinceName", {
            header: "Provincia",
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor("sectorName", {
            header: "Sector",
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor("municipalityName", {
            header: "Municipio",
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor("houseNumber", {
            header: "Numero de Casa",
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor("houseStreet", {
            header: "Calle",
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <TableActions
                    onEdit={() => handleOpenPatientDirectionModal(row.original.addressId)}
                    onDelete={() => handleOpenDeleteModal(row.original.addressId)}
                />
            ),
        }),
    ], [handleOpenPatientDirectionModal, handleOpenDeleteModal]);

    const { table, globalFilter, setGlobalFilter } = useTableWithSearch({
        data: patientDirectionList,
        columns,
        columnsToSearch: ["countryName", "provinceName", "municipalityName", "sectorName", "houseNumber", "houseStreet"],
    });

    return (
        <>
            <TableApp table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            <DeleteEntityModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                apiCall={() => deletePatientDirection(selectedPatientDirection)}
                message="¿Esta seguro que quiere eliminar esta dirección de paciente?"
                tittle="Eliminar Dirección de Paciente"
            />
        </>
    );
};

export default PatientDirectionTable;