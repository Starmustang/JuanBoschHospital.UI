import { createColumnHelper } from "@tanstack/react-table";
import { MedicRecords } from "@/app/(DashboardLayout)/types/medic/medicRecords";
import { Box, Typography } from "@mui/material";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import TableApp from "@/app/components/tableApp/tableApp";
import { useMainStore } from "@/app/store";
import DeleteEntityModal from "@/app/components/modals/deleteModal";
import TableActions from "@/app/components/tableApp/tableActions";
import { useEffect } from "react";

const MedicRecordsTable = () => {
    const { medicRecordsList, handleOpenMedicRecordsModal, handleOpenDeleteMedicRecordModal, showDeleteMedicRecordModal, handleCloseDeleteMedicRecordModal, medicRecordId, deleteMedicRecord, getMedicRecordsList } = useMainStore();
    const columnHelper = createColumnHelper<MedicRecords>();

    const handleDelete = () => {
        if (medicRecordId) {
            deleteMedicRecord(medicRecordId);
        }
        handleCloseDeleteMedicRecordModal();
    };

    useEffect(() => {
        getMedicRecordsList();
    }, [getMedicRecordsList]);

    const columns = [
        columnHelper.accessor("patientName", {
            header: "Patient Name",
            cell: info => (
                <Typography>{info.getValue()}</Typography>
            )
        }),
        columnHelper.accessor("followUpMedicRecord", {
            header: "Seguimiento de record medico",
            cell: info => (
                <Typography>{info.getValue()}</Typography>
            )
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <TableActions
                    onEdit={() => handleOpenMedicRecordsModal(row.original.recordId)}
                    onDelete={() => handleOpenDeleteMedicRecordModal(row.original.recordId)}
                />
            ),
        }),
    ];

    const { table, globalFilter, setGlobalFilter } = useTableWithSearch({
        data: medicRecordsList,
        columns,
        columnsToSearch: ["patientName", "followUpMedicRecord"],
    });

    

    return (
        <Box>
            <TableApp table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            <DeleteEntityModal
                open={showDeleteMedicRecordModal}
                onClose={handleCloseDeleteMedicRecordModal}
                onConfirm={handleDelete}
            />
        </Box>
    );
}
export default MedicRecordsTable;