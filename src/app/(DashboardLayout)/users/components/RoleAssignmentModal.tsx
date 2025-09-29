import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  CircularProgress,
  Box,
  Chip,
} from '@mui/material';
import { useMainStore } from '@/app/store';
import { Role, User } from '../../types/users/user';

interface RoleAssignmentModalProps {
  open: boolean;
  onClose: () => void;
  userId: string | null;
}

const RoleAssignmentModal: React.FC<RoleAssignmentModalProps> = ({
  open,
  onClose,
  userId,
}) => {
  const { roleList, userList, fetchRoles, assignRole, removeRole, userIsLoading } = useMainStore();
  const [rolesToAdd, setRolesToAdd] = useState<string[]>([]);
  const [rolesToRemove, setRolesToRemove] = useState<string[]>([]);

  // Get current user and their roles
  const currentUser = userList.find((user: User) => user.id === userId);
  const currentUserRoles = currentUser?.roles || [];

  useEffect(() => {
    if (open) {
      fetchRoles();
      setRolesToAdd([]);
      setRolesToRemove([]);
    }
  }, [open, fetchRoles]);

  const handleRoleToggle = (roleName: string) => {
    const hasRole = currentUserRoles.includes(roleName);
    
    if (hasRole) {
      // User has this role, so we want to remove it
      if (rolesToRemove.includes(roleName)) {
        // Already marked for removal, unmark it
        setRolesToRemove(prev => prev.filter(r => r !== roleName));
      } else {
        // Mark for removal
        setRolesToRemove(prev => [...prev, roleName]);
        // Remove from add list if it was there
        setRolesToAdd(prev => prev.filter(r => r !== roleName));
      }
    } else {
      // User doesn't have this role, so we want to add it
      if (rolesToAdd.includes(roleName)) {
        // Already marked for addition, unmark it
        setRolesToAdd(prev => prev.filter(r => r !== roleName));
      } else {
        // Mark for addition
        setRolesToAdd(prev => [...prev, roleName]);
        // Remove from remove list if it was there
        setRolesToRemove(prev => prev.filter(r => r !== roleName));
      }
    }
  };

  const handleApplyChanges = async () => {
    if (!userId) return;

    try {
      // Remove roles first
      for (const roleName of rolesToRemove) {
        await removeRole({ roleName, userId });
      }
      
      // Then add roles
      for (const roleName of rolesToAdd) {
        await assignRole({ roleName, userId });
      }
      
      handleClose();
    } catch (error) {
      // Error is handled in the slice
    }
  };

  const handleClose = () => {
    setRolesToAdd([]);
    setRolesToRemove([]);
    onClose();
  };

  const getRoleStatus = (roleName: string) => {
    const hasRole = currentUserRoles.includes(roleName);
    const willAdd = rolesToAdd.includes(roleName);
    const willRemove = rolesToRemove.includes(roleName);

    if (hasRole && willRemove) return 'removing';
    if (!hasRole && willAdd) return 'adding';
    if (hasRole && !willRemove) return 'current';
    return 'available';
  };

  const hasChanges = rolesToAdd.length > 0 || rolesToRemove.length > 0;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Asignar Rol al Usuario</DialogTitle>
      <DialogContent>
        {userIsLoading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Haga clic en los roles para agregar o quitar del usuario:
            </Typography>
            
            {currentUser && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Usuario: {currentUser.firstName} {currentUser.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Roles actuales: {currentUserRoles.length > 0 ? currentUserRoles.join(', ') : 'Ninguno'}
                </Typography>
              </Box>
            )}

            <List>
              {roleList.map((role: Role) => {
                const status = getRoleStatus(role.name);
                let chipColor: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' = 'default';
                let chipVariant: 'filled' | 'outlined' = 'outlined';
                
                switch (status) {
                  case 'current':
                    chipColor = 'primary';
                    chipVariant = 'filled';
                    break;
                  case 'adding':
                    chipColor = 'success';
                    chipVariant = 'filled';
                    break;
                  case 'removing':
                    chipColor = 'error';
                    chipVariant = 'filled';
                    break;
                  default:
                    chipColor = 'default';
                    chipVariant = 'outlined';
                }

                return (
                  <ListItem key={role.id} disablePadding>
                    <ListItemButton onClick={() => handleRoleToggle(role.name)}>
                      <ListItemText 
                        primary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <span>{role.name}</span>
                            <Chip 
                              size="small" 
                              label={
                                status === 'current' ? 'Actual' :
                                status === 'adding' ? 'Agregar' :
                                status === 'removing' ? 'Quitar' : 'Disponible'
                              }
                              color={chipColor}
                              variant={chipVariant}
                            />
                          </Box>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>

            {hasChanges && (
              <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Cambios pendientes:
                </Typography>
                {rolesToAdd.length > 0 && (
                  <Typography variant="body2" color="success.main">
                    Agregar: {rolesToAdd.join(', ')}
                  </Typography>
                )}
                {rolesToRemove.length > 0 && (
                  <Typography variant="body2" color="error.main">
                    Quitar: {rolesToRemove.join(', ')}
                  </Typography>
                )}
              </Box>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          onClick={handleApplyChanges}
          variant="contained"
          disabled={!hasChanges || userIsLoading}
        >
          Aplicar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoleAssignmentModal;
