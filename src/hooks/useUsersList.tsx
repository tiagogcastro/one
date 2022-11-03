import { useContext } from 'react';

import { UserListContext } from '../context';

export function useUsersList() {
  return useContext(UserListContext);
}
