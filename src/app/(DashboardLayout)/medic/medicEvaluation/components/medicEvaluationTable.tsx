import { createColumnHelper } from "@tanstack/react-table";
import { MedicEvaluations } from "@/app/(DashboardLayout)/types/medic/medicEvaluations";
import { Typography } from "@mui/material";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import TableApp from "@/app/components/tableApp/tableApp";
import { useMainStore } from "@/app/store";

const MedicEvaluationTable = () => {
    const {medicEvaluationsList} = useMainStore();
    const columnHelper = createColumnHelper<MedicEvaluations>();
    const columns = [
        columnHelper.accessor("heartRateEva", { 
            header: "Frecuencia Cardíaca" ,
            cell: info => (
            <Typography>
                {info.getValue()}
            </Typography>
            )
        }),
        columnHelper.accessor("weightEva", { 
            header: "peso" ,
            cell: info => (
            <Typography>
                {info.getValue()}
            </Typography>
            )
        }),
        columnHelper.accessor("presurreEva", { 
            header: "presión" ,
            cell: info => (
            <Typography>
                {info.getValue()}
            </Typography>
            )
        }),
        columnHelper.accessor("breathingEva", { 
            header: "respiración" ,
            cell: info => (
            <Typography>
                {info.getValue()}
            </Typography>
            )
        }),
        columnHelper.accessor("heightEva", { 
            header: "altura" ,
            cell: info => (
            <Typography>
                {info.getValue()}
            </Typography>
            )
        }),
    ];
    const {table, globalFilter, setGlobalFilter} = useTableWithSearch({
        data: medicEvaluationsList,
        columns,
        columnsToSearch: ["heartRateEva", "weightEva", "presurreEva", "breathingEva"],
    });
    return (
        <TableApp table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
    );
}
export default MedicEvaluationTable;
