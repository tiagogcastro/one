import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input } from '../../../../components/Forms/Input';
import { AiOutlineClose } from 'react-icons/ai';
import { useUsersFromCompanyList } from '../../../../hooks/useUsersFromCompanyList';
import { useAuth } from '../../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { apiError } from '../../../../utils/formatApiError';
import {
  nouApi,
  Permission,
  UserFromCompanyData,
  UserPermission,
} from '../../../../services';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InputLabel, MenuItem, Select } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#222222',
  boxShadow: 24,
  p: 4,
  mx: 4,
};

export interface ViewUserDataModalProps {
  handleClose: () => void;
  isOpen: boolean;
}

export default function ViewUserDataModal({
  handleClose,
  isOpen,
}: ViewUserDataModalProps) {
  const { isUserCompanyAdmin } = useAuth();
  const { currentUserData: user, setUsers } = useUsersFromCompanyList();
  const { company_id } = useParams();

  const [notHavePerms, setNotHavePerms] = useState<Permission[]>([]);

  async function getPermissionsThatUserDoesNotHave() {
    const response = await nouApi.get('/user-permission/list/not-have-in-company', {
      params: {
        user_id: user?.id,
        company_id,
      },
    });

    setNotHavePerms(response.data);
  }

  async function handleRemovePermission(permission_name: string) {
    try {
      await nouApi.delete('/user-permission/remove', {
        params: {
          company_id,
          user_id: user?.id,
          permission: permission_name,
        },
      });

      setUsers((prevState) => {
        const foundUsers = prevState.map((prevUser) => {
          if (prevUser.id === user?.id) {
            return {
              ...prevUser,
              UserPermission: prevUser.UserPermission.filter((prevPermission) => {
                return prevPermission.permission.permission !== permission_name;
              }),
            };
          }

          return prevUser;
        });

        if (foundUsers) {
          return [...foundUsers];
        }

        return [...prevState];
      });

      handleClose();

      toast.success('Sucesso! Permissão do usuário na empresa removida', {
        style: {
          background: '#222222',
        },
      });
    } catch (error: any) {
      const errors = apiError(error);

      errors.messages.map((message) => {
        toast.error(message, {
          style: {
            background: '#222222',
          },
        });
      });
    }
  }

  async function handleRemoveUserCompany(user_id: string) {
    try {
      await nouApi.delete('/user-company/remove', {
        params: {
          company_id,
          user_id,
        },
      });

      setUsers((prevState) => {
        return prevState.filter((where) => where.id !== user_id);
      });

      handleClose();

      toast.success('Sucesso! Usuário removido da empresa', {
        style: {
          background: '#222222',
        },
      });
    } catch (error: any) {
      const errors = apiError(error);

      errors.messages.map((message) => {
        toast.error(message, {
          style: {
            background: '#222222',
          },
        });
      });
    }
  }

  async function handleAddNewUserPerm(permission: string) {
    try {
      await nouApi.post<UserPermission>('/user-permission/create', {
        permission,
        user_id: user?.id,
        company_id,
      });

      setNotHavePerms((prevState) => {
        return prevState.filter((where) => {
          return where.permission !== permission;
        });
      });

      const foundUsers = await nouApi.get<UserFromCompanyData[]>('/user-company/list', {
        params: {
          company_id,
        },
      });

      setUsers(foundUsers.data);

      handleClose();
    } catch (error) {
      const errors = apiError(error);

      errors.messages.map((message) => {
        toast.error(message, {
          style: {
            background: '#222222',
          },
        });
      });
    }
  }

  useEffect(() => {
    getPermissionsThatUserDoesNotHave();
  }, []);

  if (!user) {
    return (
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} position="relative">
          Carregando...
        </Box>
      </Modal>
    );
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} position="relative" maxWidth={'1280px'} width="100%">
          <Box display="flex" alignItems="center" marginTop={2} gap={2}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Informações do usuário
            </Typography>
            {isUserCompanyAdmin && (
              <Box display="flex" alignItems="center" gap={2}>
                <Button
                  color="error"
                  sx={{
                    height: 'max-content',
                  }}
                  variant="contained"
                  size="small"
                  onClick={() => handleRemoveUserCompany(user.id)}
                >
                  Remover da empresa
                </Button>
                {notHavePerms.length > 0 && (
                  <Box>
                    <InputLabel>Adicionar permissão</InputLabel>
                    <Select
                      fullWidth
                      label="Adicionar nova permissão"
                      value=""
                      onChange={(e) => handleAddNewUserPerm(e.target.value as string)}
                    >
                      {notHavePerms.map((permission) => (
                        <MenuItem key={permission.id} value={permission.permission}>
                          {permission.permission}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                )}
              </Box>
            )}
            <Box position="absolute" top="0" right="0">
              <Button sx={{ p: 1, display: 'block' }} onClick={handleClose}>
                <AiOutlineClose />
              </Button>
            </Box>
          </Box>
          <Box
            display="flex"
            width="100%"
            alignItems="flex-start"
            justifyContent="center"
            gap={4}
          >
            <Box marginTop={4} width="100%">
              <Input labelText="E-mail" defaultValue={user?.email} disabled />

              <Input labelText="Nome" defaultValue={user?.name} disabled />
              <Input labelText="Último nome" defaultValue={user?.lastname} disabled />
              <Input labelText="Username" defaultValue={user?.username} disabled />
            </Box>

            <Box marginTop={4} width="100%">
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                marginTop={2}
              >
                Cargos
              </Typography>
              <Box
                display="flex"
                flexWrap="wrap"
                gap={3}
                borderTop="1px solid #4f4f50"
                paddingTop={1}
              >
                {user.UserRole &&
                  user.UserRole.map(({ role }) => (
                    <Box
                      display="flex"
                      alignItems="flex-start"
                      flexDirection="column"
                      gap={1}
                      key={role.id}
                    >
                      <Typography>{role.role}</Typography>
                    </Box>
                  ))}
              </Box>
            </Box>

            <Box marginTop={4} width="100%">
              <Box>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  marginTop={2}
                >
                  Permissões na empresa
                </Typography>
              </Box>
              <Box
                display="flex"
                flexWrap="wrap"
                gap={3}
                borderTop="1px solid #4f4f50"
                paddingTop={1}
              >
                {user.UserPermission &&
                  user.UserPermission.map(({ permission }) => (
                    <Box
                      display="flex"
                      alignItems="flex-start"
                      flexDirection="column"
                      gap={1}
                      key={permission.id}
                    >
                      <Typography>{permission.permission}</Typography>
                      {isUserCompanyAdmin && (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleRemovePermission(permission.permission)}
                        >
                          Remover
                        </Button>
                      )}
                    </Box>
                  ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
