"use client";

import { useMainStore } from "@/app/store";
import { createColumnHelper } from "@tanstack/react-table";
import { ArsEnsurance } from "@/app/(DashboardLayout)/types/Ars/ArsEnsurance/arsEnsurance";
import { Typography } from "@mui/material";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import TableApp from "@/app/components/tableApp/tableApp";
import React, { useEffect } from "react";
import TableActions from "@/app/components/tableApp/tableActions";
import DeleteEntityModal from "@/app/components/modal/DeleteEntityModal";

const ArsEnsuranceTable = () => {
    const { arsEnsuranceList, getArsEnsuranceList, handleOpenArsEnsuranceModal, handleOpenDeleteModal, showDeleteModal, handleCloseDeleteModal, deleteArsEnsurance, selectedArsEnsurance } = useMainStore();

    useEffect(() => {
        getArsEnsuranceList();
    }, [getArsEnsuranceList]);

    const [columnFilters, setColumnFilters] = React.useState<any>([]);
    const columnHelper = createColumnHelper<ArsEnsurance>();
    const columns = React.useMemo(() => [
        columnHelper.accessor("ensuranceName", {
            header: "Nombre",
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor("ensurancePhone", {
            header: "Telefono",
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor("ensuranceEmail", {
            header: "Email",
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <TableActions
                    onEdit={() => handleOpenArsEnsuranceModal(row.original.arsEnsuranceId)}
                    onDelete={() => handleOpenDeleteModal(row.original.arsEnsuranceId || 0)}
                />
            ),
        }),
    ], [handleOpenArsEnsuranceModal, handleOpenDeleteModal]);

    const { table, globalFilter, setGlobalFilter } = useTableWithSearch({
        data: arsEnsuranceList,
        columns,
        columnsToSearch: ['ensuranceName', 'ensurancePhone', 'ensuranceEmail'],
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
    })
    return (
        <>
            <TableApp table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            <DeleteEntityModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                apiCall={() => deleteArsEnsurance(selectedArsEnsurance)}
                message="¿Esta seguro que quiere eliminar esta aseguradora?"
                tittle="Eliminar Aseguradora"
            />
        </>
    );
}
export default ArsEnsuranceTable;