import { useContext } from 'react';

import { CompanyContext } from '../context';

export function useCompany() {
  return useContext(CompanyContext);
}
