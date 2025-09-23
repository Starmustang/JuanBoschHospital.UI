import { useMainStore } from "@/app/store";
import { DoctorAddress } from "@/app/(DashboardLayout)/types/Address/doctorAddress/doctorAddress";
import { createColumnHelper } from "@tanstack/react-table";
import { Typography } from "@mui/material";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import TableApp from "@/app/components/tableApp/tableApp";
import React, { useEffect, useMemo } from "react";
import TableActions from '@/app/components/tableApp/tableActions';
import DeleteEntityModal from '@/app/components/modal/DeleteEntityModal';

const DoctorAddressTable = () => {
    const { doctorAddressList, getDoctorAddressList, handleOpenDoctorAddressModal, handleOpenDeleteModal, showDeleteModal, handleCloseDeleteModal, deleteDoctorAddress, selectedDoctorAddress } = useMainStore();
    const columnHelper = createColumnHelper<DoctorAddress>();
    const [columnFilters, setColumnFilters] = React.useState<any>([]);

    useEffect(() => {
        getDoctorAddressList();
    }, [getDoctorAddressList]);

    const columns = useMemo(() => [
        columnHelper.accessor('doctorHouseNumber', {
            header: 'Número de Casa',
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('doctorStreet', {
            header: 'Calle',
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('sectorName', {
            header: 'Sector',
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <TableActions
                    onEdit={() => handleOpenDoctorAddressModal(row.original.doctorAddressId)}
                    onDelete={() => handleOpenDeleteModal(row.original.doctorAddressId || 0)}
                />
            ),
        }),
    ], [handleOpenDoctorAddressModal, handleOpenDeleteModal]);

    const { table, globalFilter, setGlobalFilter } = useTableWithSearch({
        data: doctorAddressList,
        columns,
        columnsToSearch: ['doctorHouseNumber', 'doctorStreet', 'sectorName'],
        options: {
            initialState: {
                columnVisibility: {},
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
                apiCall={() => deleteDoctorAddress(selectedDoctorAddress)}
                message="¿Está seguro que quiere eliminar esta dirección?"
                tittle="Eliminar Dirección"
            />
        </>
    );
}

export default DoctorAddressTable;
