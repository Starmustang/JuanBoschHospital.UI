import { IconButton, Stack, Tooltip } from '@mui/material';
import React from 'react';
import { Icon } from '@iconify/react';
// import { useUserRole } from '@/app/hooks/useUserRole';

interface TableActionsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  viewTooltip?: string;
  editTooltip?: string;
  deleteTooltip?: string;
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  editRoles?: string[];
  deleteRoles?: string[];
  userRoles?: string[];
}

const TableActions: React.FC<TableActionsProps> = ({
  onView,
  onEdit,
  onDelete,
  viewTooltip = 'Ver',
  editTooltip = 'Editar',
  deleteTooltip = 'Eliminar',
  showView = true,
  showEdit = true,
  showDelete = true,
  editRoles = [],
  deleteRoles = [],
}) => {
  // const { userRoles } = useUserRole();

//   const hasEditPermission = !editRoles.length || editRoles.some((role) => userRoles.includes(role));
//   const hasDeletePermission =
//     !deleteRoles.length || deleteRoles.some((role) => userRoles.includes(role));

  return (
    <Stack direction="row" spacing={1}>
      
      {/* {showEdit && hasEditPermission && ( */}
        <Tooltip title={editTooltip}>
          <IconButton onClick={onEdit}>
            <Icon icon="solar:pen-new-square-line-duotone" width="21" height="21" />
          </IconButton>
        </Tooltip>
      {/* )} */}
      
      {/* {showDelete && hasDeletePermission && ( */}
        <Tooltip title={deleteTooltip}>
          <IconButton color="error" onClick={onDelete}>
            <Icon icon="solar:trash-bin-2-line-duotone" width="21" height="21" />
          </IconButton>
        </Tooltip>
        {/* )} */}
    </Stack>
  );
};

export default TableActions;
