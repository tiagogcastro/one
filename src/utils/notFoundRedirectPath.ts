import { UserData } from '../services';
import { getUserValidations } from './validationUser';

interface Props {
  user: UserData | null;
  isLogged: boolean;
  currentCompanyId: string | null;
}

export function notFoundRedirectPath({ user, isLogged, currentCompanyId }: Props) {
  let notFoundRedirectPagePath = '/';

  const { isUserAdmin, isUserCompanyAdmin } = getUserValidations(user);

  const itsPartOfTheCompany = user?.UserCompany
    ? !!user?.UserCompany.find((where) => where.companyId === currentCompanyId)
    : false;

  if (!isLogged) {
    return '/login';
  }

  if (isUserAdmin) {
    return '/admin/dashboard';
  }

  if (isUserCompanyAdmin && !isUserAdmin) {
    return `/profile`;
  }

  if (itsPartOfTheCompany) {
    return `/client/${currentCompanyId}/dashboard`;
  }

  return notFoundRedirectPagePath;
}
