import { UserData } from '../services';

export function getUserValidations(user: UserData | null) {
  let isUserCompanyAdmin = false;
  let isUserAdmin = false;

  if (user?.UserRole) {
    isUserCompanyAdmin = !!user?.UserRole.find((where) => {
      return where.role.role === 'company.admin';
    });

    isUserAdmin = !!user?.UserRole.find((where) => {
      return where.role.role === 'admin';
    });
  }

  return {
    isUserCompanyAdmin,
    isUserAdmin,
  };
}
