export interface User {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export interface Role {
  id: string;
  name: string;
}

export interface AssignRoleRequest {
  roleName: string;
  userId: string;
}
