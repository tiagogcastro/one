export interface User {
  id: string;
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  avatar: string | null;
  avatar_url: string | null;
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
  UserPermission: UserPermission[];
}

export interface Equipament {
  id: string;
  name: string;
  companyAreaId: string;
  hardwareId: string | null;
  updated_at: string;
  created_at: string;
  params: {
    volume: string | null | boolean | number;
    recipe_name: string | null | boolean | number;
    batch: string | null | boolean | number;
    output_status: string | null | boolean | number;

    temperature: number;
    temperature_setpoint: number;
    histerese: number;
    offset: number;
    connected: boolean;
    process_status: boolean;
  };
}

export interface UserCompany {
  id: string;
  userId: string;
  companyId: string;
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
  UserRole: UserRole[];
  Company: Company[];
}

export interface UserFromCompanyData extends User {
  UserPermission: UserPermission[];
  UserRole: UserRole[];
}
