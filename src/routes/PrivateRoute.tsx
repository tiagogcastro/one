import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

export type PrivateRouteProps = {
  redirect_to?: string;
};

export function PrivateRoute({ redirect_to = '/batata' }: PrivateRouteProps) {
  const { loading, user } = useAuth();

  if (loading) {
    return <>Loading...</>;
  }

  if (!user) {
    return <Navigate to={redirect_to} />;
  }

  return <Outlet />;
}
