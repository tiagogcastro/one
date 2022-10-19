import { Permission } from '@prisma/client';
import { prisma } from 'src/shared/infra/prisma/client';

export async function findByPermission(permission: string): Promise<Permission | null> {
  return prisma.permission.findUnique({
    where: {
      permission
    },
  });
}