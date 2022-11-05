import React, { createContext, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { CompaniesData, nouApi } from '../../services';

type CompanyContextData = {
  setCompanies(fn: CompaniesData[] | ((user: CompaniesData[]) => CompaniesData[])): void;
  companies: CompaniesData[];

  setCurrentCompanyId(fn: string | null | ((user: string) => string | null)): void;
  currentCompanyId: string | null;

  setCurrentCompany(
    fn: CompaniesData | null | ((user: CompaniesData) => CompaniesData | null),
  ): void;
  currentCompany: CompaniesData | null;

  handleChangeCurrentCompanyId: (CurrentCompanyId: string) => void;
};

type CompanyProviderProps = {
  children: React.ReactNode;
};

export const CompanyContext = createContext<CompanyContextData>({} as CompanyContextData);

export const currentCompanyIdStorageKey = '@nou:currentCompanyId';

export function CompanyProvider({ children }: CompanyProviderProps) {
  const { token, user } = useAuth();

  const currentCompanyIdStorage = localStorage.getItem(currentCompanyIdStorageKey);

  const [companies, setCompanies] = useState<CompaniesData[]>([]);
  const [currentCompanyId, setCurrentCompanyId] = useState<string | null>(
    currentCompanyIdStorage,
  );

  const [currentCompany, setCurrentCompany] = useState<CompaniesData | null>(null);

  async function getCompaniesFromMe() {
    if (user) {
      const response = await nouApi.get<CompaniesData[]>(
        '/user-company/list/users-companies',
      );

      const companiesData = response.data;

      setCompanies(companiesData);

      const foundCompany = companiesData.find(
        (where) => where.company.id === currentCompanyId,
      );

      if ((companiesData.length > 0 && !currentCompanyIdStorage) || !foundCompany) {
        setCurrentCompanyId(companiesData[0].company.id);
        setCurrentCompany(companiesData[0]);
        localStorage.setItem(currentCompanyIdStorageKey, companiesData[0].company.id);
      }

      if (foundCompany) {
        setCurrentCompany(foundCompany);
      }
    }
  }

  function handleChangeCurrentCompanyId(currentCompanyId: string) {
    setCurrentCompanyId(currentCompanyId);

    const foundCompany = companies.find((where) => where.company.id === currentCompanyId);
    if (foundCompany) {
      setCurrentCompany(foundCompany);
    }
    localStorage.setItem(currentCompanyIdStorageKey, currentCompanyId);
  }

  useEffect(() => {
    nouApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    getCompaniesFromMe();
  }, [user]);

  return (
    <CompanyContext.Provider
      value={{
        setCurrentCompanyId,
        setCompanies,
        handleChangeCurrentCompanyId,
        companies,
        currentCompanyId,

        currentCompany,
        setCurrentCompany,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}
