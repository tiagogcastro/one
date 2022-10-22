import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { SignInUserPage } from '../pages/Auth/SignInUser';
import { SignUpUserPage } from '../pages/Auth/SignUpUser';
import Home from '../pages/UserPages/Home/Home';
import { AdminRoute } from './AdminRoute';
import { CompanyAdminRoute } from './company/AdminRouter';
import { CompanyGeralRoute } from './company/GeralRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export function Routers() {
  const { isLogged } = useAuth();

  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<SignInUserPage />} path="/login" />
          <Route element={<SignInUserPage />} path="/" />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route
            element={
              <>
                <h1>profile</h1>
              </>
            }
            path="/profile"
          />
          <Route element={<AdminRoute />}>
            <Route element={<SignUpUserPage />} path="/users/register" />
          </Route>

          <Route element={<CompanyAdminRoute />}>
            {/* <Route element={<SignUpUserPage />} path="/equipament/update" /> */}
          </Route>

          <Route element={<CompanyGeralRoute />}>
            <Route element={<Home />} path="/dashboard" />
          </Route>
        </Route>

        {/* Not found page */}
        <Route element={<Navigate to={isLogged ? '/dashboard' : '/login'} />} path="*" />
      </Routes>
    </>
  );
}
