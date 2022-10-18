import { User } from '@prisma/client';
import { prisma } from 'src/shared/infra/prisma/client';

export async function findByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      email
    },
  });

  return user;
}
  