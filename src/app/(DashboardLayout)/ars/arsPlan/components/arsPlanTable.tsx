import { useMainStore } from "@/app/store";
import { createColumnHelper } from "@tanstack/react-table";
import { ArsPlan } from "@/app/(DashboardLayout)/types/Ars/ArsPlan/arsPlan";
import { Typography } from "@mui/material";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import TableApp from "@/app/components/tableApp/tableApp";
import React, { useEffect } from "react";
import TableActions from "@/app/components/tableApp/tableActions";
import DeleteEntityModal from "@/app/components/modal/DeleteEntityModal";

const ArsPlanTable = () => {
    const { arsPlanList, getArsPlanList, handleOpenArsPlanModal, handleOpenDeleteModal, showDeleteModal, handleCloseDeleteModal, deleteArsPlan, selectedArsPlan } = useMainStore();

    useEffect(() => {
        getArsPlanList();
    }, [getArsPlanList]);

    const [columnFilters, setColumnFilters] = React.useState<any>([]);
    const columnHelper = createColumnHelper<ArsPlan>();
    const columns = React.useMemo(() => [
         columnHelper.accessor("afiliationNumberArs", {
            header: "N° de afiliación",
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor("arsPlansName", {
            header: "Nombre del plan",
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor("coveragePlanArs", {
            header: "Cobertura",
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor("internationalCoverage", {
            header: "Cobertura internacional",
            cell: (info) => <Typography>{info.getValue() ? 'Si' : 'No'}</Typography>,
        }),
        columnHelper.accessor("isPlanActive", {
            header: "Activo",
            cell: (info) => <Typography>{info.getValue() ? 'Si' : 'No'}</Typography>,
        }),
        columnHelper.accessor("maxLimitArs", {
            header: "Límite máximo",
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <TableActions
                    onEdit={() => handleOpenArsPlanModal(row.original.arsPlansId)}
                    onDelete={() => handleOpenDeleteModal(row.original.arsPlansId)}
                />
            ),
        }),
    ], [handleOpenArsPlanModal, handleOpenDeleteModal]);

    const { table, globalFilter, setGlobalFilter } = useTableWithSearch({
        data: arsPlanList,
        columns,
        columnsToSearch: ['arsPlansName', 'coveragePlanArs', 'internationalCoverage', 'isPlanActive', 'maxLimitArs'],
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
                apiCall={() => deleteArsPlan(selectedArsPlan)}
                message="¿Esta seguro que quiere eliminar este plan?"
                tittle="Eliminar Plan"
            />
        </>
    );
}
export default ArsPlanTable;