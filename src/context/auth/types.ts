import { Company, User, UserData } from '../../services';

export interface SignInData {
  email: string;
  password: string;
}

export interface SignInResponseData {
  user: UserData;
  token: string;
}

export interface RegisterUserData {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  company?: {
    name?: string;
    id?: string;
  };
}

export interface RegisterUserResponseData {
  success: string;
  user: User;
  company: Company;
}
