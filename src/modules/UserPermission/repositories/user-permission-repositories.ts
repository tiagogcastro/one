import { UserPermission } from '@prisma/client';
import { prisma } from 'src/shared/infra/prisma/client';

export async function findUserPermissionByIds(permissionId: string, userId: string): Promise<UserPermission | null> {
  const userPermission = await prisma.userPermission.findFirst({
    where: {
      permissionId,
      userId,
    }
  });

  return userPermission;
}