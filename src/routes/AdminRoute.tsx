import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export type AdminRouteProps = {
  redirect_to?: string;
};

export function AdminRoute({ redirect_to = '/login' }: AdminRouteProps) {
  const { user } = useAuth();

  const validateRoles = ['admin'];

  const isAdmin = user?.UserRole.find((where) => validateRoles.includes(where.role.role));

  if (!isAdmin) {
    return <Navigate to={redirect_to} />;
  }

  return <Outlet />;
}
