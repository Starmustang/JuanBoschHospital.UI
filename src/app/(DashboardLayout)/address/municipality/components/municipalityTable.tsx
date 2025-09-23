"use client";
import { createColumnHelper } from "@tanstack/react-table";
import { Municipality } from "@/app/(DashboardLayout)/types/Address/municipality/municipality";
import { useMainStore } from "@/app/store";
import { Typography } from "@mui/material";
import TableApp from "@/app/components/tableApp/tableApp";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import React, { useEffect, useMemo } from "react";
import TableActions from '@/app/components/tableApp/tableActions';
import DeleteEntityModal from '@/app/components/modal/DeleteEntityModal';

const columnHelper = createColumnHelper<Municipality>();

const MunicipalityTable = () => {
    const { municipalityList, getMunicipalityList, handleOpenMunicipalityModal, handleOpenDeleteModal, showDeleteModal, handleCloseDeleteModal, deleteMunicipality, selectedMunicipality } = useMainStore();

    useEffect(() => {
        getMunicipalityList();
    }, [getMunicipalityList]);

    const [columnFilters, setColumnFilters] = React.useState<any>([]);

    const columns = useMemo(() => [
        columnHelper.accessor('municipalityName', {
            header: 'Nombre',
            cell: (info) => (
                <Typography>
                    {info.getValue()}
                </Typography>
            ),
        }),
        columnHelper.accessor('provinceName', {
            header: 'Provincia',
            cell: (info) => (
                <Typography>
                    {info.getValue()}
                </Typography>
            ),
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <TableActions
                    onEdit={() => handleOpenMunicipalityModal(row.original.municipalityId)}
                    onDelete={() => handleOpenDeleteModal(row.original.municipalityId || 0)}
                />
            ),
        }),
    ], [handleOpenMunicipalityModal, handleOpenDeleteModal]);

    const { table, globalFilter, setGlobalFilter } = useTableWithSearch({
        data: municipalityList,
        columns,
        columnsToSearch: ["municipalityName", "provinceName"],
        options: {
            initialState: {
                columnVisibility: {

                }
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
                apiCall={() => deleteMunicipality(selectedMunicipality)}
                message="¿Esta seguro que quiere eliminar este municipio?"
                tittle="Eliminar Municipio"
            />
        </>
    );
}
export default MunicipalityTable;