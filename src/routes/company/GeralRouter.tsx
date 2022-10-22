import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export type CompanyGeralRouteProps = {
  redirect_to?: string;
};

export function CompanyGeralRoute({ redirect_to = '/profile' }: CompanyGeralRouteProps) {
  const { user } = useAuth();

  const validateRoles = ['admin', 'company.admin'];

  const isAdminOrCompanyOwner = user?.UserRole.find((where) => {
    return validateRoles.includes(where.role.role);
  });

  const itsPartOfTheCompany = user?.UserCompany.find((where) => where.userId === user.id);

  if (isAdminOrCompanyOwner || itsPartOfTheCompany) {
    return <Outlet />;
  }

  return <Navigate to={redirect_to} />;
}
