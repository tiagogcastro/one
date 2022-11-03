import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

export type CompanyGeralRouteProps = {
  redirect_to?: string;
};

export function CompanyGeralRoute({ redirect_to = '/' }: CompanyGeralRouteProps) {
  const { user, isUserAdmin, isUserCompanyAdmin } = useAuth();

  const itsPartOfTheCompany = user?.UserCompany.find((where) => where.userId === user.id);

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
