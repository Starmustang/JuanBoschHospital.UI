import { IconButton, Stack, Tooltip } from '@mui/material';
import React from 'react';
import { Icon } from '@iconify/react';
import { useUserRole } from '@/app/hooks/useUserRole';
import { hasPermission } from '@/app/utils/permissions';

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
  editPermissions?: string[];
  deletePermissions?: string[];
  viewPermissions?: string[];
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
  editPermissions = [],
  deletePermissions = [],
  viewPermissions = [],
}) => {
  const { userRoles } = useUserRole();

  const hasViewPermission = !viewPermissions.length || viewPermissions.some((permission) => hasPermission(userRoles, permission));
  const hasEditPermission = !editPermissions.length || editPermissions.some((permission) => hasPermission(userRoles, permission));
  const hasDeletePermission = !deletePermissions.length || deletePermissions.some((permission) => hasPermission(userRoles, permission));

  return (
    <Stack direction="row" spacing={1}>
      {showView && onView && hasViewPermission && (
        <Tooltip title={viewTooltip}>
          <IconButton onClick={onView}>
            <Icon icon="solar:eye-line-duotone" width="21" height="21" />
          </IconButton>
        </Tooltip>
      )}
      
      {showEdit && onEdit && hasEditPermission && (
        <Tooltip title={editTooltip}>
          <IconButton onClick={onEdit}>
            <Icon icon="solar:pen-new-square-line-duotone" width="21" height="21" />
          </IconButton>
        </Tooltip>
      )}
      
      {showDelete && onDelete && hasDeletePermission && (
        <Tooltip title={deleteTooltip}>
          <IconButton color="error" onClick={onDelete}>
            <Icon icon="solar:trash-bin-2-line-duotone" width="21" height="21" />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};

export default TableActions;
