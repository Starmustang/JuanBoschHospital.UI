"use client";
import { Province } from "@/app/(DashboardLayout)/types/Address/province/province";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState, useMemo } from "react";
import { useMainStore } from "@/app/store";
import Typography from "@mui/material/Typography";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import TableApp from "@/app/components/tableApp/tableApp";
import TableActions from '@/app/components/tableApp/tableActions';
import DeleteEntityModal from '@/app/components/modal/DeleteEntityModal';

const columnHelper = createColumnHelper<Province>();

const ProvinceTable = () => {
    const [columnFilters, setColumnFilters] = useState<any>([]);
    const { provinceList, getProvinceList, handleOpenProvinceModal, handleOpenDeleteModal, showDeleteModal, handleCloseDeleteModal, deleteProvince, selectedProvince } = useMainStore();
    
    useEffect(() => {
        getProvinceList();
    }, [getProvinceList]);

    const columns = useMemo(() => [
        columnHelper.accessor('provinceName', {
            header: 'Nombre',
            cell: (info) => (
                <Typography>
                {info.getValue()}
                </Typography>
            ),
        }),
        columnHelper.accessor('countryName', {
            header: 'Pais',
            cell: (info) => (
                <Typography>
                {info.getValue()}
                </Typography>
            ),
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Acciones',
            cell: ({row}) => (
                <TableActions
                    onEdit={() => handleOpenProvinceModal(row.original.provinceId)}
                    onDelete={() => handleOpenDeleteModal(row.original.provinceId || 0)}
                />
            ),
        }),
    ], [handleOpenProvinceModal, handleOpenDeleteModal]);

    const {table, globalFilter, setGlobalFilter} = useTableWithSearch({
        data: provinceList,
        columns,
        columnsToSearch: ['provinceName', 'countryName'],
        options: {
            initialState: {
                columnVisibility: {                    
                },
            },
            onColumnFiltersChange: setColumnFilters,
            debugTable: true,
            debugHeaders: true,
            debugColumns: false,
        }
    });

    return (
        <>
            <TableApp table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            <DeleteEntityModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                apiCall={() => deleteProvince(selectedProvince)}
                message="¿Esta seguro que quiere eliminar esta provincia?"
                tittle="Eliminar Provincia"
            />
        </>
    );
}

export default ProvinceTable;