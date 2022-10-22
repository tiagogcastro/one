import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

export type PrivateRouteProps = {
  redirect_to?: string;
};

export function CompanyAdminRoute({ redirect_to = '/login' }: PrivateRouteProps) {
  const { user } = useAuth();

  const validateRoles = ['admin', 'company.admin'];

  const isAdminOrCompanyOwner = user?.UserRole.find((where) => {
    return validateRoles.includes(where.role.role);
  });

  if (!isAdminOrCompanyOwner) {
    return <Navigate to={redirect_to} />;
  }

  return <Outlet />;
}
