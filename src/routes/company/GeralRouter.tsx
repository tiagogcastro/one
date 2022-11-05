import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { useCompany } from '../../hooks/useCompany';

export type CompanyGeralRouteProps = {
  redirect_to?: string;
};

export function CompanyGeralRoute({ redirect_to = '/' }: CompanyGeralRouteProps) {
  const { user, isUserAdmin, isUserCompanyAdmin } = useAuth();
  const { currentCompanyId } = useCompany();

  const itsPartOfTheCompany = user?.UserCompany.find(
    (where) => where.companyId === currentCompanyId,
  );

  if (!itsPartOfTheCompany && isUserAdmin) {
    return <Navigate to={'/admin/dashboard' || redirect_to} />;
  }

  if (!isUserCompanyAdmin && !itsPartOfTheCompany && !isUserAdmin) {
    return <Navigate to={'/profile' || redirect_to} />;
  }

  if (isUserCompanyAdmin || itsPartOfTheCompany) {
    return <Outlet />;
  }

  return <Navigate to={redirect_to} />;
}
