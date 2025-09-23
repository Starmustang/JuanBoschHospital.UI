import { createColumnHelper } from "@tanstack/react-table";
import { MedicEvaluations } from "@/app/(DashboardLayout)/types/medic/medicEvaluations";
import { Typography } from "@mui/material";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import TableApp from "@/app/components/tableApp/tableApp";
import { useMainStore } from "@/app/store";
import React, { useEffect } from "react";
import TableActions from "@/app/components/tableApp/tableActions";
import DeleteEntityModal from "@/app/components/modal/DeleteEntityModal";

const MedicEvaluationTable = () => {
    const { medicEvaluationsList, getMedicEvaluationsList, handleOpenMedicEvaluationModal, handleOpenDeleteModal, showDeleteModal, handleCloseDeleteModal, deleteMedicEvaluation, selectedMedicEvaluation } = useMainStore();

    useEffect(() => {
        getMedicEvaluationsList();
    }, [getMedicEvaluationsList]);

    const [columnFilters, setColumnFilters] = React.useState<any>([]);
    const columnHelper = createColumnHelper<MedicEvaluations>();
    const columns = React.useMemo(() => [
        columnHelper.accessor("heartRateEva", { 
            header: "Frecuencia Cardíaca" ,
            cell: info => <Typography>{info.getValue()}</Typography>
        }),
        columnHelper.accessor("weightEva", { 
            header: "peso" ,
            cell: info => <Typography>{info.getValue()}</Typography>
        }),
        columnHelper.accessor("presurreEva", { 
            header: "presión" ,
            cell: info => <Typography>{info.getValue()}</Typography>
        }),
        columnHelper.accessor("breathingEva", { 
            header: "respiración" ,
            cell: info => <Typography>{info.getValue()}</Typography>
        }),
        columnHelper.accessor("heightEva", { 
            header: "altura" ,
            cell: info => <Typography>{info.getValue()}</Typography>
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <TableActions
                    onEdit={() => handleOpenMedicEvaluationModal(row.original.medicEvaluationId)}
                    onDelete={() => handleOpenDeleteModal(row.original.medicEvaluationId)}
                />
            ),
        }),
    ], [handleOpenMedicEvaluationModal, handleOpenDeleteModal]);

    const { table, globalFilter, setGlobalFilter } = useTableWithSearch({
        data: medicEvaluationsList,
        columns,
        columnsToSearch: ["heartRateEva", "weightEva", "presurreEva", "breathingEva"],
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
                apiCall={() => deleteMedicEvaluation(selectedMedicEvaluation)}
                message="¿Esta seguro que quiere eliminar esta evaluación?"
                tittle="Eliminar Evaluación"
            />
        </>
    );
}
export default MedicEvaluationTable;
