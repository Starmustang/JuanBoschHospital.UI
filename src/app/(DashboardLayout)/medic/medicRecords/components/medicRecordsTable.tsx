import { createColumnHelper } from "@tanstack/react-table";
import { MedicRecords } from "@/app/(DashboardLayout)/types/medic/medicRecords";
import { Typography } from "@mui/material";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import TableApp from "@/app/components/tableApp/tableApp";
import { useMainStore } from "@/app/store";

const MedicRecordsTable = () => {
    const {medicRecordsList} = useMainStore();
    const columnHelper = createColumnHelper<MedicRecords>();
    const columns = [
        columnHelper.accessor("patientName", { 
            header: "Patient Name" ,
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
    ];
    const {table, globalFilter, setGlobalFilter} = useTableWithSearch({
        data: medicRecordsList,
        columns,
        columnsToSearch: ["patientName", "followUpMedicRecord"],
    });
    return (
        <TableApp table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
    );
}
export default MedicRecordsTable;