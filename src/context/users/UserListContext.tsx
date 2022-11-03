import React, { createContext, useState } from 'react';
import { UserData } from '../../services';

type UserListContextData = {
  setUsers(fn: UserData[] | ((user: UserData[]) => UserData[])): void;
  setCurrentUserData(fn: UserData | null | ((user: UserData) => UserData | null)): void;
  users: UserData[];
  currentUserData: UserData | null;
};

type UserListProviderProps = {
  children: React.ReactNode;
};

export const UserListContext = createContext<UserListContextData>(
  {} as UserListContextData,
);

export function UserListProvider({ children }: UserListProviderProps) {
  const [users, setUsers] = useState<UserData[]>([]);
  const [currentUserData, setCurrentUserData] = useState<UserData | null>(null);

  return (
    <UserListContext.Provider
      value={{
        setCurrentUserData,
        setUsers,
        users,
        currentUserData,
      }}
    >
      {children}
    </UserListContext.Provider>
  );
}
