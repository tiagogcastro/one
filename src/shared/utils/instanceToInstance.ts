import { User } from '@prisma/client';

export function userInstanceToInstance(user: User | User[]) {
  if(Array.isArray(user)) {
    const data = user;

    return data.map(where => {
      const {password, ...result} = where;

      return result;
    })

  }

  const { password, ...result } = user;

  return result;
}