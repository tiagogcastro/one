import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export type PrivateRouteProps = {
  redirect_to?: string;
};

export function PrivateRoute({ redirect_to = '/login' }: PrivateRouteProps) {
  const { isLogged } = useAuth();

  if (isLogged) {
    return <Outlet />;
  }

  return <Navigate to={redirect_to} />;
}
