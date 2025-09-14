import { DateDoctor } from "@/app/(DashboardLayout)/types/Dates/DateDoctor/dateDoctor";
import TableApp from "@/app/components/tableApp/tableApp";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import { useMainStore } from "@/app/store";
import formatedDate from "@/utils/function/formatedDate";
import { Typography } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";


const columnHelper = createColumnHelper<DateDoctor>();
const DateDoctorTable = () => {
    const {dateDoctorList} = useMainStore();
    const [columnFilters, setColumnFilters] = React.useState<any>([]);
    
    const columns = [
        columnHelper.accessor('dateDoctorSintoms', {
            header: 'Sintomas',
            cell: (info) => {
                <Typography>
                    {info.getValue()}
                </Typography>;
            }
        }),
        columnHelper.accessor('dateDoctorIndicatedAnalisis', {
            header: 'Analisis Indicado',
            cell: (info) => {
                <Typography>
                    {info.getValue()}
                </Typography>;
            }
        }),
        columnHelper.accessor('dateDoctorTreatment', {
            header: 'Tratamiento',
            cell: (info) => {
                <Typography>
                    {info.getValue()}
                </Typography>;
            }
        }),
        columnHelper.accessor('dateDoctorNotes', {
            header: 'Notas',
            cell: (info) => {
                 <Typography>
                    {info.getValue()}
                 </Typography>;
            },
        }),
        columnHelper.accessor('dateDoctorNextDate', {
            header: 'Fecha Siguiente',
            cell: (info) => {
                <Typography>
                    {formatedDate(info.getValue())}
                </Typography>;
            }
        }),

    ];

    const {table, globalFilter, setGlobalFilter} = useTableWithSearch({
        data: dateDoctorList, 
        columns,
        columnsToSearch: ['dateDoctorSintoms', 'dateDoctorIndicatedAnalisis', 'dateDoctorTreatment', 'dateDoctorNotes', 'dateDoctorNextDate'],
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
export default DateDoctorTable;