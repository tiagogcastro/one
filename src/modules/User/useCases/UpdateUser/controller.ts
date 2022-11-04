import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { compare, hash } from 'bcrypt';
import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
import { userInstanceToInstance } from 'src/shared/utils/instanceToInstance';
import { findByEmail, findById, findByUsername, updateUser } from '../../repositories/user-repositories';
import { findUserRoleByRoleIdAndUserId } from '../../repositories/user-role-repositories';

export class UpdateUserController {
  public async user({ request, response }: HttpContextContract) {
    const userLoggedId = request.user.id;
    const userToEditId = request.qs().user_id as string;

    const { name, lastname, username, email, newPassword, oldPassword } = request.all();

    let newUser = {
      name, 
      lastname, 
      username, 
      email, 
      newPassword, 
      oldPassword,
    };

    try {
      const adminRole = await findByRole('admin');

      if (!adminRole) {
        throw new Error('Admin role not found');
      }

      if(!userToEditId) {
        throw new Error('Please, enter user_id');
      }

      let userToEdit = await findById(userToEditId);

      if(!userToEdit) {
        throw new Error('User not found');
      }

      const adminUserRole = await findUserRoleByRoleIdAndUserId(adminRole.id, userLoggedId);

      if (!adminUserRole && userToEdit.id !== userLoggedId) {
        throw new Error('Cannot update user');
      }

      if(userLoggedId !== userToEdit.id && !adminUserRole) {
        throw new Error("Você não tem permissão para editar este usuário");
      }

      if (username) {
        const checkUsernameAlreadyExists = await findByUsername(username);
  
        if (checkUsernameAlreadyExists && userToEdit.username !== username) {
          throw new Error('Username already exists');
        }

        userToEdit.username = username;
      }

      if (email) {
        const checkEmailAlreadyExists = await findByEmail(email);
  
        if (checkEmailAlreadyExists && userToEdit.email !== email) {
          throw new Error('Username already exists');
        }
        
        userToEdit.email = email;
      }

      if(newPassword && !oldPassword) {
        throw new Error("Coloque a senha antiga");
      }

      if(!newPassword && oldPassword) {
        throw new Error("Coloque a nova senha");
      }

      if(newPassword && oldPassword) {
        const newPasswordIsEqual = await compare(newUser.oldPassword, userToEdit.password);

        if(!newPasswordIsEqual) {
          throw new Error("Senha antiga informada é diferente da senha salva");
        }

        const hashNewPassword = await hash(newUser.newPassword, 10);

        if(!hashNewPassword) {
          throw new Error("Não foi possível hashear a senha");
        }

        userToEdit = {
          ...userToEdit,
          password: hashNewPassword,
        }
      }

      userToEdit = {
        ...userToEdit,
        name: newUser.name || userToEdit.name,
        lastname: newUser.lastname || userToEdit.lastname,
        email: newUser.email || userToEdit.email,
        username: newUser.username || userToEdit.username,
      }

      const userUpdated = await updateUser(userToEdit.id, userToEdit)

      return response
        .status(200)
        .send({
          ...userInstanceToInstance(userUpdated),
        })
      
    } catch(error) {
      return response
        .status(400)
        .send({
          error: error.message
        })
    }
  }

}