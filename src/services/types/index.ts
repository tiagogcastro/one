export interface Role {
  id: string;
  role: string;
}

export interface Permission {
  id: string;
  permission: string;
}

export interface User {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

export interface Company {
  name: string;
}

export interface Equipament {}

export interface UserCompany {}

export interface UserPermission {
  id: string;
  permission: Permission;
}

export interface UserRole {
  id: string;
  role: Role;
}

export interface UserData extends User {
  UserPermission: UserPermission[];
  UserRole: UserRole[];
}
