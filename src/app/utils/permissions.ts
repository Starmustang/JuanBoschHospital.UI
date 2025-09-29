// Role constants
export const ROLES = {
  ADMIN: 'administrador',
  USER: 'usuario',
  AUXILIAR: 'auxiliar',
} as const;

// Permission constants
export const PERMISSIONS = {
  // Patient permissions
  PATIENT_CREATE: 'patient:create',
  PATIENT_READ: 'patient:read',
  PATIENT_UPDATE: 'patient:update',
  PATIENT_DELETE: 'patient:delete',
  
  // Medical evaluation permissions
  MEDIC_EVALUATION_CREATE: 'medic_evaluation:create',
  MEDIC_EVALUATION_READ: 'medic_evaluation:read',
  MEDIC_EVALUATION_UPDATE: 'medic_evaluation:update',
  MEDIC_EVALUATION_DELETE: 'medic_evaluation:delete',
  
  // Medical records permissions
  MEDIC_RECORDS_CREATE: 'medic_records:create',
  MEDIC_RECORDS_READ: 'medic_records:read',
  MEDIC_RECORDS_UPDATE: 'medic_records:update',
  MEDIC_RECORDS_DELETE: 'medic_records:delete',
  
  // User management permissions
  USER_CREATE: 'user:create',
  USER_READ: 'user:read',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  
  // Doctor permissions
  DOCTOR_CREATE: 'doctor:create',
  DOCTOR_READ: 'doctor:read',
  DOCTOR_UPDATE: 'doctor:update',
  DOCTOR_DELETE: 'doctor:delete',
  
  // System administration
  SYSTEM_ADMIN: 'system:admin',
} as const;

// Role-based permission mapping
export const ROLE_PERMISSIONS: Record<string, string[]> = {
  [ROLES.ADMIN]: [
    // Admin has all permissions
    PERMISSIONS.PATIENT_CREATE,
    PERMISSIONS.PATIENT_READ,
    PERMISSIONS.PATIENT_UPDATE,
    PERMISSIONS.PATIENT_DELETE,
    PERMISSIONS.MEDIC_EVALUATION_CREATE,
    PERMISSIONS.MEDIC_EVALUATION_READ,
    PERMISSIONS.MEDIC_EVALUATION_UPDATE,
    PERMISSIONS.MEDIC_EVALUATION_DELETE,
    PERMISSIONS.MEDIC_RECORDS_CREATE,
    PERMISSIONS.MEDIC_RECORDS_READ,
    PERMISSIONS.MEDIC_RECORDS_UPDATE,
    PERMISSIONS.MEDIC_RECORDS_DELETE,
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_DELETE,
    PERMISSIONS.DOCTOR_CREATE,
    PERMISSIONS.DOCTOR_READ,
    PERMISSIONS.DOCTOR_UPDATE,
    PERMISSIONS.DOCTOR_DELETE,
    PERMISSIONS.SYSTEM_ADMIN,
  ],
  [ROLES.USER]: [
    // Usuario has very limited permissions - ONLY patients and medical records/evaluations
    PERMISSIONS.PATIENT_CREATE,
    PERMISSIONS.PATIENT_READ,
    PERMISSIONS.PATIENT_UPDATE,
    // Note: No PATIENT_DELETE permission
    PERMISSIONS.MEDIC_EVALUATION_CREATE,
    PERMISSIONS.MEDIC_EVALUATION_READ,
    PERMISSIONS.MEDIC_EVALUATION_UPDATE,
    PERMISSIONS.MEDIC_RECORDS_CREATE,
    PERMISSIONS.MEDIC_RECORDS_READ,
    PERMISSIONS.MEDIC_RECORDS_UPDATE,
    // Note: No access to doctors, blood, dates, addresses, ARS, etc.
  ],
  [ROLES.AUXILIAR]: [
    // Auxiliar has the most limited permissions - ONLY update existing patients
    PERMISSIONS.PATIENT_READ,
    PERMISSIONS.PATIENT_UPDATE,
    // Note: No create, delete, or access to any other modules
  ],
};

/**
 * Check if user roles have a specific permission
 */
export const hasPermission = (userRoles: string[], permission: string): boolean => {
  return userRoles.some(role => 
    ROLE_PERMISSIONS[role]?.includes(permission) ?? false
  );
};

/**
 * Check if user roles have any of the specified permissions
 */
export const hasAnyPermission = (userRoles: string[], permissions: string[]): boolean => {
  return permissions.some(permission => hasPermission(userRoles, permission));
};

/**
 * Check if user roles have all of the specified permissions
 */
export const hasAllPermissions = (userRoles: string[], permissions: string[]): boolean => {
  return permissions.every(permission => hasPermission(userRoles, permission));
};

/**
 * Get all permissions for given roles
 */
export const getPermissionsForRoles = (userRoles: string[]): string[] => {
  const allPermissions = new Set<string>();
  
  userRoles.forEach(role => {
    const rolePermissions = ROLE_PERMISSIONS[role] || [];
    rolePermissions.forEach(permission => allPermissions.add(permission));
  });
  
  return Array.from(allPermissions);
};

/**
 * Check if user is admin
 */
export const isAdmin = (userRoles: string[]): boolean => {
  return userRoles.includes(ROLES.ADMIN);
};

/**
 * Check if user is regular user
 */
export const isUsuario = (userRoles: string[]): boolean => {
  return userRoles.includes(ROLES.USER);
};

/**
 * Check if user is auxiliar
 */
export const isAuxiliar = (userRoles: string[]): boolean => {
  return userRoles.includes(ROLES.AUXILIAR);
};
