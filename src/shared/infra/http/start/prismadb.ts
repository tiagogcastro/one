import { prisma } from '../../prisma/client'
import bcrypt from 'bcrypt';
import { findByEmail } from 'src/modules/User/repositories/user-repositories'
import { findByRole } from 'src/modules/Roles/repositories/role-repositories'

let adminData = {
  email: process.env.NOU_ADMIN_EMAIL || 'nouAdmin001api@gmail.com',
  password: process.env.NOU_ADMIN_PASSWORD || 'nouAdmin001apiPassword',
  name: process.env.NOU_ADMIN_NAME || 'nouAdmin',
  lastname: process.env.NOU_ADMIN_LASTNAME || 'lastname',
  username: process.env.NOU_ADMIN_USERNAME || 'nouAdminUsername',
};

export async function startPrismaDB() {
  try {
    const permissionsDefault = ['edit.setpoint', 'edit.status', 'edit.config', 'manual', 'auto'];

    permissionsDefault.forEach(async (permission) => {
      const foundPermissions = await prisma.permission.findMany();

      if(!foundPermissions.find((perm => perm.permission === permission))) {
        await prisma.permission.create({
          data: {
            permission
          }
        });
      }
    });

    const foundUser = await findByEmail(adminData.email);

    if(foundUser) {
      return;
    }

    const passwordHashed = await bcrypt.hash(adminData.password, 10);

    if(!passwordHashed) {
      throw new Error("Cannot hash password");
    }

    adminData = {
      ...adminData,
      password: passwordHashed
    };
    
    const user = await prisma.user.create({
      data: adminData
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
        },
        {
          role: 'company.admin'
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