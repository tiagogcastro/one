import { UserData } from '../services';

interface Props {
  user: UserData | null;
  isLogged: boolean;
  currentCompanyId: string | null;
}

export function notFoundRedirectPath({ user, isLogged, currentCompanyId }: Props) {
  let notFoundRedirectPagePath = '/';

  const isCompanyAdmin = user?.UserRole.find((where) => {
    return where.role.role === 'company.admin';
  });

  const isAdmin = user?.UserRole.find((where) => {
    return where.role.role === 'admin';
  });

  const itsPartOfTheCompany = user?.UserCompany.find(
    (where) => where.companyId === currentCompanyId,
  );

  if (!isLogged) {
    return '/login';
  }

  if (isAdmin) {
    return '/admin/dashboard';
  }

  if (isCompanyAdmin && !isAdmin) {
    return `/client/${currentCompanyId}/admin/dashboard`;
  }

  if (itsPartOfTheCompany) {
    return `/client/${currentCompanyId}/dashboard`;
  }

  return notFoundRedirectPagePath;
}
