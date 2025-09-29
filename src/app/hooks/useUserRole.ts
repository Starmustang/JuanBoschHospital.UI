import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

export interface UserRoleHook {
  userRoles: string[];
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasAllRoles: (roles: string[]) => boolean;
  isAdmin: boolean;
  isUsuario: boolean;
  isAuxiliar: boolean;
  canDelete: boolean;
  canEdit: boolean;
  canView: boolean;
}

export const useUserRole = (): UserRoleHook => {
  const { data: session } = useSession();

  const userRoles = useMemo(() => {
    // First check if roles array exists
    if (session?.user?.roles && Array.isArray(session.user.roles)) {
      return session.user.roles;
    }
    
    // Fallback to role property
    if (session?.user?.role) {
      return Array.isArray(session.user.role) ? session.user.role : [session.user.role];
    }
    
    return [];
  }, [session?.user?.role, session?.user?.roles]);

  const hasRole = (role: string): boolean => {
    return userRoles.includes(role);
  };

  const hasAnyRole = (roles: string[]): boolean => {
    return roles.some(role => userRoles.includes(role));
  };

  const hasAllRoles = (roles: string[]): boolean => {
    return roles.every(role => userRoles.includes(role));
  };

  const isAdmin = hasRole('administrador');
  const isUsuario = hasRole('usuario');
  const isAuxiliar = hasRole('auxiliar');

  // Permission logic based on roles
  const canDelete = isAdmin; // Only admin can delete
  const canEdit = isAdmin || isUsuario || isAuxiliar; // Admin, usuario, and auxiliar can edit
  const canView = isAdmin || isUsuario || isAuxiliar; // All can view

  return {
    userRoles,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    isAdmin,
    isUsuario,
    isAuxiliar,
    canDelete,
    canEdit,
    canView,
  };
};
