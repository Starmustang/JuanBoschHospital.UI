"use client";

import TableApp from "@/app/components/tableApp/tableApp";
import { Country } from "../../../types/Address/country/country";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import React, { useEffect } from "react";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import Typography from "@mui/material/Typography";
import { useMainStore } from "@/app/store";
import TableActions from "@/app/components/tableApp/tableActions";
import DeleteEntityModal from "@/app/components/modal/DeleteEntityModal";

const columnHelper = createColumnHelper<Country>()

const CountryTable = () => {
    const { countryList, getCountryList, showDeleteModal, handleCloseDeleteModal, selectedDeleteCountryId, 
        deleteCountry, handleOpenDeleteModal, handleOpenCountryModal } = useMainStore();

    useEffect(() => {
        getCountryList();        
    }, [getCountryList]);

    const [columnFilters, setColumnFilters] = React.useState<any>([]);
    const columns = React.useMemo(() => [
        columnHelper.accessor('countryName', {
            header: 'Nombre',
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.accessor('countryLanguage', {
            header: 'Idioma',
            cell: (info) => (
                <Typography>
                {info.getValue()},
                </Typography>
            ),
        }),
        columnHelper.accessor('countryCurrency', {
            header: 'Moneda',
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
                    onEdit={() => handleOpenCountryModal(row.original.countryId)}
                    onDelete={() => handleOpenDeleteModal(row.original.countryId)}
                />
            ),
        }), 
    ], []);



    const {table, globalFilter, setGlobalFilter} = useTableWithSearch({
        data: countryList,
        columns,
        columnsToSearch: ['countryName', 'countryLanguage', 'countryCurrency'],
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
        apiCall={() => deleteCountry(selectedDeleteCountryId)}
        message="¿Esta seguro que quiere eliminar este pais?"
        tittle="Eliminar Pais"
      />    
        </>

    );
}

export default CountryTable;