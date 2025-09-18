import { createColumnHelper } from "@tanstack/react-table";
import { DoctorEnsurance } from "@/app/(DashboardLayout)/types/Doctor/DoctorEnsurance";
import { Typography } from "@mui/material";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import TableApp from "@/app/components/tableApp/tableApp";
import { useState } from "react";
import { useMainStore } from "@/app/store";

const DoctorEnsuranceTable = () => {
    const { doctorEnsuranceList } = useMainStore();
    const columnHelper = createColumnHelper<DoctorEnsurance>();
    const [columnFilters, setColumnFilters] = useState<any>([]);
    const columns = [
        columnHelper.accessor("doctorName", {
            header: "Doctor",
            cell: info => (
                <Typography>
                    {info.getValue()}
                </Typography>
            )
        }),
        columnHelper.accessor("ensuranceName", {
            header: "ARS Aseguradora",
            cell: info => (
                <Typography>
                    {info.getValue()}
                </Typography>
            )
        }),
        columnHelper.accessor("medicCode", {
            header: "Código Médico",
            cell: info => (
                <Typography>
                    {info.getValue()}
                </Typography>
            )
        })
    ]
    const {table, globalFilter, setGlobalFilter} = useTableWithSearch({
        data:   doctorEnsuranceList,
        columns,
        columnsToSearch: ["doctorName", "ensuranceName", "medicCode"],
        options: {
            initialState: {
              columnVisibility: {
                // Default all columns to visible
              },
             
            },
            onColumnFiltersChange: setColumnFilters,
            debugTable: true,
            debugHeaders: true,
            debugColumns: false,
        }
    });
    return (
        <TableApp table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
    );
}
export default DoctorEnsuranceTable;