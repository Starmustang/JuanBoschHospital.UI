import { createColumnHelper } from "@tanstack/react-table";
import { DoctorEnsurance } from "@/app/(DashboardLayout)/types/Doctor/DoctorEnsurance";
import { Typography } from "@mui/material";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import TableApp from "@/app/components/tableApp/tableApp";
import React, { useEffect, useState } from "react";
import { useMainStore } from "@/app/store";
import TableActions from "@/app/components/tableApp/tableActions";
import DeleteEntityModal from "@/app/components/modal/DeleteEntityModal";

const DoctorEnsuranceTable = () => {
    const { doctorEnsuranceList, getDoctorEnsuranceList, handleOpenDoctorEnsuranceModal, handleOpenDeleteModal, showDeleteModal, handleCloseDeleteModal, deleteDoctorEnsurance, selectedDoctorEnsurance } = useMainStore();

    useEffect(() => {
        getDoctorEnsuranceList();
    }, [getDoctorEnsuranceList]);

    const [columnFilters, setColumnFilters] = useState<any>([]);
    const columnHelper = createColumnHelper<DoctorEnsurance>();
    const columns = React.useMemo(() => [
        columnHelper.accessor("doctorName", {
            header: "Doctor",
            cell: info => <Typography>{info.getValue()}</Typography>
        }),
        columnHelper.accessor("ensuranceName", {
            header: "ARS Aseguradora",
            cell: info => <Typography>{info.getValue()}</Typography>
        }),
        columnHelper.accessor("medicCode", {
            header: "Código Médico",
            cell: info => <Typography>{info.getValue()}</Typography>
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <TableActions
                    onEdit={() => handleOpenDoctorEnsuranceModal(row.original.doctorEnsuranceId)}
                    onDelete={() => handleOpenDeleteModal(row.original.doctorEnsuranceId)}
                />
            ),
        }),
    ], [handleOpenDoctorEnsuranceModal, handleOpenDeleteModal]);

    const { table, globalFilter, setGlobalFilter } = useTableWithSearch({
        data: doctorEnsuranceList,
        columns,
        columnsToSearch: ["doctorName", "ensuranceName", "medicCode"],
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
                apiCall={() => deleteDoctorEnsurance(selectedDoctorEnsurance)}
                message="¿Esta seguro que quiere eliminar este seguro de doctor?"
                tittle="Eliminar Seguro de Doctor"
            />
        </>
    );
}
export default DoctorEnsuranceTable;