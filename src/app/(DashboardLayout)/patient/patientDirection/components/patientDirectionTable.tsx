import { createColumnHelper } from "@tanstack/react-table";
import { PatientDirection } from "@/app/(DashboardLayout)/types/patient/patientDIrection";
import { Typography } from "@mui/material";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import { useMainStore } from "@/app/store";
import TableApp from "@/app/components/tableApp/tableApp";

const PatientDirectionTable = () => {
    const {patientDirectionList} = useMainStore();
    const columnHelper = createColumnHelper<PatientDirection>();
    const columns =[
        columnHelper.accessor("countryName", {
            header: "Pais",
            cell: (info) => (
            <Typography>
                {info.getValue()}
            </Typography>),
        }),
        columnHelper.accessor("provinceName", {
            header: "Provincia",
            cell: (info) => (
            <Typography>
                {info.getValue()}
            </Typography>),
        }),
        columnHelper.accessor("sectorName", {
            header: "Sector",
            cell: (info) => (
            <Typography>
                {info.getValue()}
            </Typography>),
        }),
        columnHelper.accessor("municipalityName", {
            header: "Municipio",
            cell: (info) => (
            <Typography>
                {info.getValue()}
            </Typography>),
        }),
        columnHelper.accessor("houseNumber", {
            header: "Numero de Casa",
            cell: (info) => (
            <Typography>
                {info.getValue()}
            </Typography>),
        }),
        columnHelper.accessor("houseStreet", {
            header: "Calle",
            cell: (info) => (
            <Typography>
                {info.getValue()}
            </Typography>),
        }) 

    ]
    const {table, globalFilter, setGlobalFilter} = useTableWithSearch({
        data: patientDirectionList,
        columns,
        columnsToSearch: ["countryName", "provinceName", "municipalityName", "sectorName", "houseNumber", "houseStreet"],
    })
    return (
        <TableApp table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}/>
    );
};

export default PatientDirectionTable;