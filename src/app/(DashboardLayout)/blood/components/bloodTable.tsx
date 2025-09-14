import { ColumnVisibility, createColumnHelper } from "@tanstack/react-table";
import { blood } from "../../types/Blood/blood";
import { useState } from "react";
import { Typography } from "@mui/material";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import TableApp from "@/app/components/tableApp/tableApp";
import { useMainStore } from "@/app/store";

const columnHelper = createColumnHelper<blood>()
const BloodTable = () => {
    const [columnFilters, setColumnFilters] = useState<any>([]);
    const {bloodList} = useMainStore();

    const columns = [
        columnHelper.accessor('bloodType', {
            header: 'Tipo de sangre',
            cell: (info) => (
                <Typography>
                    {info.getValue()},
                </Typography>
            ),
        }),
    ]
    const {table, globalFilter, setGlobalFilter} = useTableWithSearch({
        data: bloodList,
        columns,
        columnsToSearch: ['bloodType'],
        options: {
            initialState: {
                ColumnVisibility: {

                }
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
export default BloodTable