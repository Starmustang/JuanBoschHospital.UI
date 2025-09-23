import { Sector } from "@/app/(DashboardLayout)/types/Address/sector/sector";
import { createColumnHelper } from "@tanstack/react-table";
import Typography from "@mui/material/Typography";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import { useState, useEffect, useMemo } from "react";
import TableApp from "@/app/components/tableApp/tableApp";
import TableActions from '@/app/components/tableApp/tableActions';
import DeleteEntityModal from '@/app/components/modal/DeleteEntityModal';
import { useMainStore } from "@/app/store";

const SectorTable = () => {
    const columnHelper = createColumnHelper<Sector>(); 
        const { sectorList, getSectorList, handleOpenSectorModal, handleOpenDeleteModal, showDeleteModal, handleCloseDeleteModal, deleteSector, selectedSector } = useMainStore();

    useEffect(() => {
        getSectorList();
    }, [getSectorList]);
    const [columnFilters, setColumnFilters] = useState<any>([]);
        const columns = useMemo(() => [
        columnHelper.accessor('sectorName', {
            header: 'Nombre',
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.accessor('municipalityName', {
            header: 'Municipio',
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Acciones',
            cell: ({row}) => (
                <TableActions
                    onEdit={() => handleOpenSectorModal(row.original.sectorId)}
                    onDelete={() => handleOpenDeleteModal(row.original.sectorId || 0)}
                />
            ),
        }),
    ], [handleOpenSectorModal, handleOpenDeleteModal]);
    const {table, globalFilter, setGlobalFilter} = useTableWithSearch({
        data: sectorList,
        columns,
        columnsToSearch: ['sectorName', 'municipalityName'],
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
                <>
            <TableApp table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            <DeleteEntityModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                apiCall={() => deleteSector(selectedSector)}
                message="¿Esta seguro que quiere eliminar este sector?"
                tittle="Eliminar Sector"
            />
        </>
    );
}
export default SectorTable;
