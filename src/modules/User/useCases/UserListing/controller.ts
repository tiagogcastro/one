import { prisma } from 'src/shared/infra/prisma/client'

export class UserListingController {
  public async index() {
    const users = await prisma.user.findMany()
    return users
  }
  public async show({ params }) {
    const users = await prisma.user.findUnique({
      where: {
        id: params.id
      }
    });

    return users;
  }
}