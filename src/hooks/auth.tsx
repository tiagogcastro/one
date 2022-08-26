import React, { createContext, useCallback, useContext, useState } from 'react';

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
  email: string;
  telephone: string;
  profile: {
    id: number;
    name: string;
  };
  currentCountryCode?: string;
  environment: string;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IResponseSession {
  user: IUser;
  token: string;
}

interface IAuthContextData {
  user: IUser;
  // eslint-disable-next-line no-unused-vars
  signIn(credentials: ISignInCredentials): Promise<void>;
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

  const signIn = useCallback(async ({ email, password }: ISignInCredentials) => {
    const countryCode: string = await fetch(
      'https://geolocation-db.com/json/7733a990-ebd4-11ea-b9a6-2955706ddbf3',
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.country_code;
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
      .catch((erro) => console.log(erro));
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@nou-one:user');
    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, setData, signIn, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
