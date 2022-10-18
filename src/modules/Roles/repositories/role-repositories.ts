import { Role } from '@prisma/client';
import { prisma } from 'src/shared/infra/prisma/client';

export async function findByRole(roleName: string): Promise<Role | null> {
  const role = await prisma.role.findUnique({
    where: {
      role: roleName
    },
  });

  return role;
}
  