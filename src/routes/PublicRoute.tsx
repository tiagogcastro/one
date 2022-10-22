import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

export type PublicRouteProps = {
  redirect_to?: string;
};

export function PublicRoute({ redirect_to = '/dashboard' }: PublicRouteProps) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={redirect_to} />;
  }

  return <Outlet />;
}
