import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

export type PrivateRouteProps = {
  redirect_to?: string;
};

export function CompanyAdminRoute({ redirect_to = '/login' }: PrivateRouteProps) {
  const { isUserAdmin, isUserCompanyAdmin } = useAuth();

  if (!isUserCompanyAdmin && isUserAdmin) {
    return <Navigate to={'/admin/dashboard' || redirect_to} />;
  }

  if (!isUserCompanyAdmin && !isUserAdmin) {
    return <Navigate to={'/login' || redirect_to} />;
  }

  return <Outlet />;
}
