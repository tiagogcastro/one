import { AxiosError } from 'axios';
import { createContext, ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { nouApiStorageKey, UserData } from '../../services';
import { nouApi } from '../../services/clientApi';
import { apiError } from '../../utils/formatApiError';
import {
  RegisterUserData,
  RegisterUserResponseData,
  SignInData,
  SignInResponseData,
} from './types';

type AuthContextData = {
  user: UserData | null;
  token: string | null;
  loading: boolean;
  isLogged: boolean;

  isUserAdmin: boolean;
  isUserCompanyAdmin: boolean;
  itsPartOfTheCompany: boolean;

  signIn(credentials: SignInData): Promise<SignInResponseData | undefined>;
  register(credentials: RegisterUserData): Promise<RegisterUserResponseData | undefined>;
  signOut(): void;
  setUser(fn: UserData | null | ((user: UserData | null) => UserData | null)): void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function getUserValidations(user: UserData | null) {
  const isUserCompanyAdmin = !!user?.UserRole.find((where) => {
    return where.role.role === 'company.admin';
  });

  const isUserAdmin = !!user?.UserRole.find((where) => {
    return where.role.role === 'admin';
  });

  const itsPartOfTheCompany = !!user?.UserCompany.find(
    (where) => where.userId === user.id,
  );

  return {
    isUserCompanyAdmin,
    isUserAdmin,
    itsPartOfTheCompany,
  };
}

export function AuthProvider({ children }: AuthProviderProps) {
  const storageToken = localStorage.getItem(nouApiStorageKey);

  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(storageToken);
  const [isLogged, setIsLogged] = useState(false);

  const [loading, setLoading] = useState(true);

  const { isUserAdmin, isUserCompanyAdmin, itsPartOfTheCompany } =
    getUserValidations(user);

  async function getUser() {
    try {
      const response = await nouApi.get<UserData | undefined>('/users/list-unique');

      const userData = response.data;

      setIsLogged(true);
      setUser(userData || null);
      setLoading(false);

      return userData;
    } catch (error: any) {
      setLoading(false);

      return error;
    }
  }

  useEffect(() => {
    nouApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    getUser();
  }, []);

  async function signIn(
    credentials: SignInData,
  ): Promise<SignInResponseData | undefined> {
    try {
      const response = await nouApi.post<SignInResponseData>('/users/login', credentials);

      const { token, user } = response.data;

      setToken(token);
      setUser(user);
      setIsLogged(true);

      localStorage.setItem(nouApiStorageKey, token);
      nouApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      toast.success('Sucesso! Que bom ter-lo de volta aqui.', {
        style: {
          background: '#222222',
        },
      });

      return response.data;
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        error.errors.forEach((message) => {
          toast.error(message);
        });
      } else {
        const errors = apiError(error);

        errors.messages.map((message) => {
          toast.error(message, {
            style: {
              background: '#222222',
            },
          });
        });
      }
    }
  }

  async function register(
    credentials: RegisterUserData,
  ): Promise<RegisterUserResponseData | undefined> {
    try {
      const response = await nouApi.post('/users/register', credentials);

      toast.success('Sucesso! Conta criada', {
        style: {
          background: '#222222',
        },
      });

      return response.data;
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        error.errors.forEach((message) => {
          toast.error(message);
        });
      } else {
        const errors = apiError(error);

        errors.messages.map((message) => {
          toast.error(message, {
            style: {
              background: '#222222',
            },
          });
        });
      }
    }
  }

  function signOut() {
    localStorage.removeItem(nouApiStorageKey);

    nouApi.defaults.headers.common['Authorization'] = '';

    setUser(null);
    setToken(null);
    setIsLogged(false);
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        register,
        signOut,
        setUser,
        user,
        token,
        loading,
        isLogged,

        isUserAdmin,
        isUserCompanyAdmin,
        itsPartOfTheCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
