import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UserListProvider } from '../context/users/UserListContext';

import { useAuth } from '../hooks/useAuth';
import { AdminDashboardPage } from '../pages/AdminPages/Dashboard';
import { SignInUserPage } from '../pages/Auth/SignInUser';
import { SignUpUserPage } from '../pages/Auth/SignUpUser';
import Home from '../pages/UserPages/Dashboard';
import { ProfilePage } from '../pages/UserPages/Profile';
import { UniqueEquipamentPage } from '../pages/UserPages/UniqueEquipamentPage';
import { UsersFromCompanyPage } from '../pages/UserPages/UsersFromCompany';
import { notFoundRedirectPath } from '../utils/notFoundRedirectPath';
import { AdminRoute } from './AdminRoute';
import { CompanyAdminRoute } from './company/AdminRouter';
import { CompanyGeralRoute } from './company/GeralRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export function Routers() {
  const { user, isLogged } = useAuth();

  const notFoundRedirectPagePath = notFoundRedirectPath(user, isLogged);

  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<SignInUserPage />} path="/login" />
          <Route element={<SignInUserPage />} path="/" />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<ProfilePage />} path="profile" />

          <Route element={<AdminRoute />} path="admin">
            <Route
              element={
                <UserListProvider>
                  <AdminDashboardPage />
                </UserListProvider>
              }
              path="dashboard"
            />

            <Route element={<SignUpUserPage />} path="users/register" />
          </Route>

          <Route element={<CompanyAdminRoute />} path="client/admin">
            <Route element={<SignUpUserPage />} path="users/register" />
          </Route>

          <Route element={<CompanyGeralRoute />} path="client">
            <Route element={<Home />} path="dashboard" />

            <Route
              element={
                <UserListProvider>
                  <UsersFromCompanyPage />
                </UserListProvider>
              }
              path="users"
            />
            <Route element={<UniqueEquipamentPage />} path="equipament/:equipament_id" />
          </Route>
        </Route>

        {/* Not found page */}
        <Route element={<Navigate to={notFoundRedirectPagePath} />} path="*" />
      </Routes>
    </>
  );
}
