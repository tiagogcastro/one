import { prisma } from '../../prisma/client'
import bcrypt from 'bcrypt';
import { findByEmail } from 'src/modules/User/repositories/user-repositories'
import { findByRole } from 'src/modules/Roles/repositories/role-repositories'

export async function startPrismaDB() {
  try {
    const foundUser = await findByEmail('admin@admin.com');

    if(foundUser) {
      return;
    }

    const passwordHashed = await bcrypt.hash('admin', 10);

    if(!passwordHashed) {
      throw new Error("Cannot hash password");
    }
    
    const user = await prisma.user.create({
      data: {
        email: 'admin@admin.com',
        password: passwordHashed,
        username: 'admin',
        name: 'admin1',
        lastname:'admin2',
      }
    });

    const foundAdminRole = await findByRole('admin');

    if(foundAdminRole) {
      const userAdminRole = await prisma.userRole.findFirst({
        where: {
          roleId: foundAdminRole.id
        }
      });
  
      if(userAdminRole) {
        return;
      }
  
      return prisma.userRole.create({
        data: {
          roleId: foundAdminRole.id,
          userId: user.id,
        }
      });
  
    }

    const foundDefaultRole = await findByRole('default');

    if(foundDefaultRole) {
      return;
    }

    await prisma.role.createMany({
      data: [
        {
          role: 'admin'
        },
        {
          role: 'default'
        }
      ]
    });

    const foundAdminRole2 = await findByRole('admin');

    if(!foundAdminRole2) {
      return;
    }

    await prisma.userRole.create({
      data: {
        roleId: foundAdminRole2.id,
        userId: user.id,
      }
    });
  } catch (error) {
    console.log(error.message);
  }
}