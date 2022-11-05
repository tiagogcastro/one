import React, { createContext, useState } from 'react';
import { UserFromCompanyData } from '../../services';

type UsersFromCompanyContextData = {
  setUsers(
    fn: UserFromCompanyData[] | ((user: UserFromCompanyData[]) => UserFromCompanyData[]),
  ): void;
  setCurrentUserData(
    fn:
      | UserFromCompanyData
      | null
      | ((user: UserFromCompanyData) => UserFromCompanyData | null),
  ): void;
  users: UserFromCompanyData[];
  currentUserData: UserFromCompanyData | null;
};

type UsersFromCompanyProviderProps = {
  children: React.ReactNode;
};

export const UsersFromCompanyContext = createContext<UsersFromCompanyContextData>(
  {} as UsersFromCompanyContextData,
);

export function UsersFromCompanyListProvider({
  children,
}: UsersFromCompanyProviderProps) {
  const [users, setUsers] = useState<UserFromCompanyData[]>([]);
  const [currentUserData, setCurrentUserData] = useState<UserFromCompanyData | null>(
    null,
  );

  return (
    <UsersFromCompanyContext.Provider
      value={{
        setCurrentUserData,
        setUsers,
        users,
        currentUserData,
      }}
    >
      {children}
    </UsersFromCompanyContext.Provider>
  );
}
