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

export async function findById(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      id
    },
  });

  return user;
}
  
export async function findByUsername(username: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      username
    },
  });

  return user;
}

export async function updateUser(id: string, data: User): Promise<User> {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data
  });

  return user;
}
  
  
  