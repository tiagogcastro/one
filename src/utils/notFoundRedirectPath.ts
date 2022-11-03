import { UserData } from '../services';

export function notFoundRedirectPath(user: UserData | null, isLogged: boolean) {
  let notFoundRedirectPagePath = '/';

  const isCompanyAdmin = user?.UserRole.find((where) => {
    return where.role.role === 'company.admin';
  });

  const isAdmin = user?.UserRole.find((where) => {
    return where.role.role === 'admin';
  });

  const itsPartOfTheCompany = user?.UserCompany.find((where) => where.userId === user.id);

  if (!isLogged) {
    return '/login';
  }

  if (isAdmin) {
    return '/admin/dashboard';
  }

  if (isCompanyAdmin && !isAdmin) {
    return '/client/admin/dashboard';
  }

  if (itsPartOfTheCompany) {
    return '/client/dashboard';
  }

  return notFoundRedirectPagePath;
}
