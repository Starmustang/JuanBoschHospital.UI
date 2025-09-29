import { createColumnHelper } from "@tanstack/react-table";
import { User } from "../../types/users/user";
import React, { useEffect, useState } from "react";
import { Typography, Chip, IconButton, Tooltip } from "@mui/material";
import { useTableWithSearch } from "@/app/components/usetableWithUser/useTableWithUser";
import TableApp from "@/app/components/tableApp/tableApp";
import { useMainStore } from "@/app/store";
import TableActions from "@/app/components/tableApp/tableActions";
import DeleteEntityModal from "@/app/components/modal/DeleteEntityModal";
import RoleAssignmentModal from "./RoleAssignmentModal";
import { Icon } from "@iconify/react";

const UserTable = () => {
    const { 
        userList, 
        fetchUsers, 
        handleOpenUserModal, 
        handleOpenUserDeleteModal, 
        handleOpenRoleModal,
        handleCloseRoleModal,
        handleCloseUserDeleteModal, 
        deleteUser, 
        selectedUserId,
        showUserDeleteModal,
        showRoleModal
    } = useMainStore();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const [columnFilters, setColumnFilters] = useState<any>([]);
    const columnHelper = createColumnHelper<User>();

    const columns = React.useMemo(() => [
        columnHelper.accessor('userName', {
            header: 'Nombre de Usuario',
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('firstName', {
            header: 'Nombre',
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('lastName', {
            header: 'Apellido',
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: (info) => <Typography>{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('roles', {
            header: 'Roles',
            cell: (info) => (
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {info.getValue().map((role: string, index: number) => (
                        <Chip 
                            key={index} 
                            label={role} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                        />
                    ))}
                </div>
            ),
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Tooltip title="Asignar Rol">
                        <IconButton
                            color="secondary"
                            onClick={() => handleOpenRoleModal(row.original.id)}
                            size="small"
                        >
                            <Icon icon="solar:user-plus-line-duotone" width="20" height="20" />
                        </IconButton>
                    </Tooltip>
                    <TableActions
                        showEdit={false}
                        onDelete={() => handleOpenUserDeleteModal(row.original.id)}
                    />
                </div>
            ),
        }),
    ], [handleOpenUserModal, handleOpenUserDeleteModal, handleOpenRoleModal]);

    const { table, globalFilter, setGlobalFilter } = useTableWithSearch({
        data: userList,
        columns,
        columnsToSearch: ['userName', 'firstName', 'lastName', 'email'],
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
                show={showUserDeleteModal}
                handleClose={handleCloseUserDeleteModal}
                apiCall={() => deleteUser(selectedUserId!)}
                message="¿Está seguro que quiere eliminar este usuario?"
                tittle="Eliminar Usuario"
            />

            <RoleAssignmentModal
                open={showRoleModal}
                onClose={handleCloseRoleModal}
                userId={selectedUserId}
            />
        </>
    );
}

export default UserTable;
