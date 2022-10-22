export interface User {
  id: string;
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

export interface Role {
  id: string;
  role: string;
}

export interface Permission {
  id: string;
  permission: string;
}

export interface Company {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  ownerId: string;
}

export interface Equipament {}

export interface UserCompany {
  id: string;
  userId: string;
  company: Company;
}

export interface UserPermission {
  id: string;
  permission: Permission;
}

export interface UserRole {
  id: string;
  role: Role;
}

export interface UserData extends User {
  UserCompany: UserCompany[];
  UserPermission: UserPermission[];
  UserRole: UserRole[];
}
