import { useMainStore } from "@/app/store";
import { createColumnHelper } from "@tanstack/react-table";
import { ArsPlan } from "@/app/(DashboardLayout)/types/Ars/ArsPlan/arsPlan";
import { Typography } from "@mui/material";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import TableApp from "@/app/components/tableApp/tableApp";
import { useState } from "react";
const columnHelper = createColumnHelper<ArsPlan>();
const ArsPlanTable = () => {
    const {arsPlanList} = useMainStore();
    const [columnFilters, setColumnFilters] = useState<any>([]);
    
    const columns = [
        columnHelper.accessor("arsPlansId", {
            header: "ID",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("afiliationNumberArs", {
            header: "N° de afiliación",
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.accessor("arsPlansName", {
            header: "Nombre del plan",
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.accessor("coveragePlanArs", {
            header: "Cobertura",
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.accessor("internationalCoverage", {
            header: "Cobertura internacional",
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.accessor("isPlanActive", {
            header: "Activo",
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.accessor("maxLimitArs", {
            header: "Límite máximo",
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
    ]
    const {table, globalFilter, setGlobalFilter} = useTableWithSearch({
        data: arsPlanList,
        columns,
        columnsToSearch: ['arsPlansName', 'coveragePlanArs', 'internationalCoverage', 'isPlanActive', 'maxLimitArs'],
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
    })
    return (
        <TableApp table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
    );
}
export default ArsPlanTable;