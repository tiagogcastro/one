import { useContext } from 'react';

import { UsersFromCompanyContext } from '../context';

export function useUsersFromCompanyList() {
  return useContext(UsersFromCompanyContext);
}
