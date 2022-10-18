import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { compare, hash } from 'bcrypt';
import { findByRole } from 'src/modules/Roles/repositories/role-repositories';
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

      let userToEdit = await findById(userToEditId);

      if(!userToEdit) {
        throw new Error('User not found');
      }

      const adminUserRole = await findUserRoleByRoleIdAndUserId(adminRole.id, userLoggedId);

      if (!adminUserRole && userToEdit.id !== userLoggedId) {
        throw new Error('Cannot update user');
      }

      const foundUserByUsername = await findByUsername(newUser.username || userToEdit.username);
      const foundUserByEmail = await findByEmail(newUser.email || userToEdit.email);
      const foundUserLogged = await findById(userLoggedId);

      if (
        foundUserByUsername
        && userToEdit.username !== newUser.username 
        && foundUserByUsername.username === newUser.username
      ) {
        throw new Error("Cannot use another user's username");
      }

      if (
        foundUserByEmail
        && userToEdit.email !== newUser.email 
        && foundUserByEmail.email === newUser.email
      ) {
        throw new Error("Cannot use another user's email");
      }

      if(userLoggedId !== userToEdit.id && !adminUserRole) {
        throw new Error("Você não tem permissão para editar este usuário");
      }

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
        name: newUser.name || userToEdit.name,
        lastname: newUser.lastname || userToEdit.lastname,
        email: newUser.email || userToEdit.email,
        username: newUser.username || userToEdit.username,
        password: hashNewPassword,
      }

      const userUpdated = await updateUser(userToEdit.id, userToEdit)

      return response
        .status(200)
        .send({
          success: 'User updated successfully',
          user: userUpdated,
          userLogged: foundUserLogged,
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