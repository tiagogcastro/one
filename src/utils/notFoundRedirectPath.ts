import { UserData } from '../services';

export function notFoundRedirectPath(user: UserData | null, isLogged: boolean) {
  try {
    let notFoundRedirectPagePath = '';

    const isCompanyAdmin = user?.UserRole.find((where) => {
      return where.role.role === 'company.admin';
    });

    const isAdmin = user?.UserRole.find((where) => {
      return where.role.role === 'admin';
    });

    const itsPartOfTheCompany = user?.UserCompany.find(
      (where) => where.userId === user.id,
    );

    if (!isLogged) {
      notFoundRedirectPagePath = '/login';
    }

    if (!isCompanyAdmin && isAdmin) {
      notFoundRedirectPagePath = '/admin/dashboard';
    }

    if (isCompanyAdmin && !isAdmin) {
      notFoundRedirectPagePath = '/client/admin/dashboard';
    }

    if (itsPartOfTheCompany) {
      notFoundRedirectPagePath = '/client/dashboard';
    }

    return notFoundRedirectPagePath;
  } catch (error) {
    return '/';
  }
}
