import { createColumnHelper } from "@tanstack/react-table";
import { Blood } from "../../types/Blood/blood";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import TableApp from "@/app/components/tableApp/tableApp";
import { useMainStore } from "@/app/store";
import TableActions from "@/app/components/tableApp/tableActions";
import DeleteEntityModal from "@/app/components/modal/DeleteEntityModal";

const BloodTable = () => {
    const { bloodList, getBloodList, handleOpenBloodModal, handleOpenDeleteModal, showDeleteModal, handleCloseDeleteModal, deleteBlood, selectedBlood } = useMainStore();

    useEffect(() => {
        getBloodList();
    }, [getBloodList]);

    const [columnFilters, setColumnFilters] = useState<any>([]);
    const columnHelper = createColumnHelper<Blood>();

    const columns = React.useMemo(() => [
        columnHelper.accessor('bloodType', {
            header: 'Tipo de sangre',
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('consentBlood', {
            header: 'Consentimiento',
            cell: (info) => <Typography>{info.getValue() ? 'Sí' : 'No'}</Typography>,
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <TableActions
                    onEdit={() => handleOpenBloodModal(row.original.bloodId)}
                    onDelete={() => handleOpenDeleteModal(row.original.bloodId)}
                />
            ),
        }),
    ], [handleOpenBloodModal, handleOpenDeleteModal]);

    const { table, globalFilter, setGlobalFilter } = useTableWithSearch({
        data: bloodList,
        columns,
        columnsToSearch: ['bloodType'],
        options: {
            initialState: {
                columnVisibility: {},
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
                apiCall={() => deleteBlood(selectedBlood)}
                message="¿Esta seguro que quiere eliminar este tipo de sangre?"
                tittle="Eliminar Tipo de Sangrede"
            />
        </>
    );
}
export default BloodTable