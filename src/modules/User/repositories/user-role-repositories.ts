import { UserRole } from '@prisma/client';
import { prisma } from 'src/shared/infra/prisma/client';

export async function findUserRoleByUserId(user_id: string): Promise<UserRole[]> {
  const userRole = await prisma.userRole.findMany({
    where: {
      userId: user_id
    },
  });

  return userRole;
}
  
export async function findUserRoleByRoleIdAndUserId(role_id: string, user_id: string): Promise<UserRole | null> {
  const userRole = await prisma.userRole.findFirst({
    where: {
      roleId: role_id,
      userId: user_id
    },
  });

  return userRole;
}
  