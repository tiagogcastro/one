import React, { createContext, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../services/api';

interface IAuthState {
  user: IUser;
}

interface IUser {
  id: string;
  country: string;
  city: string;
  city_state: string;
  company: string;
  name: string;
  lastname: string;
  email: string;
  telephone: string;
  profile: {
    id: number;
    name: string;
  };
  currentCountryCode?: string;
  environment: string;
}

export interface ISignInCredentials {
  email: string;
  password: string;
  showPassword: boolean;
  remember: boolean;
}

export interface ISignUpCredentials {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  showPassword: boolean;
}

interface IResponseSession {
  user: IUser;
  token: string;
}

interface IAuthContextData {
  user: IUser;
  // eslint-disable-next-line no-unused-vars
  signIn(credentials: ISignInCredentials): Promise<void>;
  // eslint-disable-next-line no-unused-vars
  signUp(credentials: ISignUpCredentials): Promise<void>;
  signOut(): void;
  // eslint-disable-next-line no-unused-vars
  setData(data: IAuthState): void;
}

interface IApiResponse {
  data: any;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider = (props: any) => {
  const [data, setData] = useState<IAuthState>(() => {
    const user = localStorage.getItem('@nou-one:user');
    const token = localStorage.getItem('@nou-one:token');

    if (token && user) {
      // Inserindo e definindo o token para todas as requisições.
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const userData = JSON.parse(user);

      if (!userData.name) return {} as IAuthState;

      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signUp = useCallback(
    async ({
      name,
      lastname,
      username,
      email,
      password,
      passwordConfirmation,
    }: ISignUpCredentials) => {
      await api
        .post('users/register', {
          name,
          lastname,
          username,
          email,
          password,
          password_confirmation: passwordConfirmation,
        })
        .then((apiResponse: IApiResponse) => {
          const { success } = apiResponse.data;
          if (success != null) {
            toast.success('Usuário criado com sucesso!');
          }
        })
        .catch((error) => toast.error(error.message));
    },
    [],
  );

  const signIn = useCallback(async ({ email, password }: ISignInCredentials) => {
    const countryCode: string = await fetch(
      'https://geolocation-db.com/json/7733a990-ebd4-11ea-b9a6-2955706ddbf3',
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.country_code;
      })
      .catch((error) => {
        toast.error(error.message);
      });

    await api
      .post('users/login', {
        email,
        password,
      })
      .then((userData: IApiResponse) => {
        console.log(userData);
        const { user, token }: IResponseSession = userData.data;

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const userFormatted = {
          ...user,
          currentCountryCode: countryCode,
          environment: 'default',
        };

        localStorage.setItem('@nou-one:user', JSON.stringify(userFormatted));
        localStorage.setItem('@nou-one:token', token);

        setData({ user: userFormatted });
        //window.location.href = '/';
      })
      .catch((error) => toast.error(error.message));
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@nou-one:user');
    setData({} as IAuthState);
    toast.success('Logout executado com sucesso');
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, setData, signIn, signUp, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
