import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

export type AdminRouteProps = {
  redirect_to?: string;
};

export function AdminRoute({ redirect_to = '/profile' }: AdminRouteProps) {
  const { isUserAdmin } = useAuth();

  if (!isUserAdmin) {
    return <Navigate to={redirect_to} />;
  }

  return <Outlet />;
}
