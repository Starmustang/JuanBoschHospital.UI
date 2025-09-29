import { hasAnyPermission, hasPermission } from './permissions';

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  bgcolor?: any;
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
  permissions?: string[];
  roles?: string[];
}

/**
 * Filter menu items based on user roles and permissions
 */
export const filterMenuItemsByRole = (
  menuItems: MenuitemsType[],
  userRoles: string[]
): MenuitemsType[] => {
  return menuItems
    .map((item) => {
      // If it's a nav label, always include it
      if (item.navlabel) {
        return item;
      }

      // Check if user has required roles
      if (item.roles && item.roles.length > 0) {
        const hasRequiredRole = item.roles.some(role => userRoles.includes(role));
        if (!hasRequiredRole) {
          return null; // User doesn't have required role
        }
      }

      // Check if user has required permissions
      if (item.permissions && item.permissions.length > 0) {
        const hasRequiredPermission = hasAnyPermission(userRoles, item.permissions);
        if (!hasRequiredPermission) {
          return null; // User doesn't have required permission
        }
      }

      // If item has children, filter them recursively
      if (item.children && item.children.length > 0) {
        const filteredChildren = filterMenuItemsByRole(item.children, userRoles);
        
        // If no children remain after filtering, hide the parent item
        if (filteredChildren.length === 0) {
          return null;
        }
        
        return {
          ...item,
          children: filteredChildren,
        };
      }

      // Item passed all checks
      return item;
    })
    .filter((item): item is MenuitemsType => item !== null);
};

/**
 * Check if a user can access a specific route
 */
export const canAccessRoute = (
  href: string,
  menuItems: MenuitemsType[],
  userRoles: string[]
): boolean => {
  for (const item of menuItems) {
    // Check if this item matches the href
    if (item.href === href) {
      // Check roles
      if (item.roles && item.roles.length > 0) {
        const hasRequiredRole = item.roles.some(role => userRoles.includes(role));
        if (!hasRequiredRole) return false;
      }
      
      // Check permissions
      if (item.permissions && item.permissions.length > 0) {
        const hasRequiredPermission = hasAnyPermission(userRoles, item.permissions);
        if (!hasRequiredPermission) return false;
      }
      
      return true;
    }
    
    // Check children recursively
    if (item.children) {
      if (canAccessRoute(href, item.children, userRoles)) {
        return true;
      }
    }
  }
  
  return false;
};
