import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { nouApi, UserData } from '../../../../services';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../../../../components/Forms/Input';
import { AiOutlineClose } from 'react-icons/ai';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { apiError } from '../../../../utils/formatApiError';
import { useUsersList } from '../../../../hooks/useUsersList';

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

interface UpdateUserData {
  email: string;
  name: string;
  lastname: string;
  username: string;
}

const updateUserSchema = Yup.object().shape({
  email: Yup.string()
    .required('Você deve informar um e-mail')
    .email('Formato de e-mail inválido'),
  name: Yup.string().required('Nome obrigatório'),
  lastname: Yup.string().required('Último nome obrigatório'),
  username: Yup.string().required('Username obrigatório'),
});

export interface ViewUserDataModalProps {
  handleClose: () => void;
  isOpen: boolean;
  setOpen?: (value: boolean) => void;
  setUsers(fn: UserData[] | ((user: UserData[]) => UserData[])): void;
  setCurrentUserData(fn: UserData | null | ((user: UserData) => UserData | null)): void;
  user?: UserData | null;
}

export default function ViewUserDataModal({
  handleClose,
  isOpen,
}: ViewUserDataModalProps) {
  const { setUsers, setCurrentUserData, currentUserData: user } = useUsersList();

  const { formState, handleSubmit, register } = useForm<UpdateUserData>({
    resolver: yupResolver(updateUserSchema),
  });

  const signInErrors = formState.errors;

  const handleUpdateUserData: SubmitHandler<UpdateUserData> = async (data) => {
    try {
      const response = await nouApi.put<UserData>('/users/update', data, {
        params: {
          user_id: user?.id,
        },
      });

      const userData = response.data;

      setUsers((prevState) => {
        if (prevState) {
          return [...prevState, userData];
        }

        return [userData];
      });

      handleClose();

      toast.success('Sucesso! Informações do usuário foram atualizadas', {
        style: {
          background: '#222222',
        },
      });
    } catch (error: any) {
      const errors = apiError(error);

      errors.messages.forEach((message) => {
        toast.error(message, {
          style: {
            background: '#222222',
          },
        });
      });
    }
  };

  async function handleRemoveRole(role_id: string) {
    try {
      await nouApi.delete('/users/roles/remove', {
        params: {
          user_id: user?.id,
          role_id,
        },
      });

      setUsers((prevState) => {
        const foundUser = prevState.map((prevUser) => {
          if (prevUser.id === user?.id) {
            return {
              ...prevUser,
              UserRole: prevUser.UserRole.filter((prevRole) => {
                return prevRole.id !== role_id;
              }),
            };
          }

          return prevUser;
        });

        if (foundUser) {
          return [...foundUser];
        }

        return [...prevState];
      });

      handleClose();

      toast.info('Info! Cargo do usuário foi deletado', {
        style: {
          background: '#222222',
        },
      });
    } catch (error: any) {
      const errors = apiError(error);

      errors.messages.forEach((message) => {
        toast.error(message, {
          style: {
            background: '#222222',
          },
        });
      });
    }
  }

  async function handleDeleteAccount() {
    try {
      await nouApi.delete('/users/delete', {
        params: {
          user_id: user?.id,
        },
      });

      setUsers((prevState) => {
        return prevState.filter((where) => where.id !== user?.id);
      });

      handleClose();

      toast.success('Sucesso! Conta deletada.', {
        style: {
          background: '#222222',
        },
      });
    } catch (error: any) {
      const errors = apiError(error);

      errors.messages.forEach((message) => {
        toast.error(message, {
          style: {
            background: '#222222',
          },
        });
      });
    }
  }

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
          <Box display="flex" marginTop={2} gap={2}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Informações do usuário
            </Typography>
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{ p: 0, width: '160px' }}
              onClick={handleDeleteAccount}
            >
              Deletar conta
            </Button>
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
            <Box
              component="form"
              onSubmit={handleSubmit(handleUpdateUserData)}
              marginTop={4}
              width="100%"
            >
              <Input
                {...register('email')}
                labelText="E-mail"
                error={signInErrors.email}
                defaultValue={user?.email}
              />

              <Input
                {...register('name')}
                labelText="Nome"
                error={signInErrors.name}
                defaultValue={user?.name}
              />
              <Input
                {...register('lastname')}
                labelText="Último nome"
                defaultValue={user?.lastname}
                error={signInErrors.lastname}
              />
              <Input
                {...register('username')}
                labelText="Username"
                defaultValue={user?.username}
                error={signInErrors.username}
              />
              <Button
                variant="contained"
                size="large"
                type="submit"
                fullWidth
                style={{ marginTop: '16px' }}
              >
                Atualizar dados
              </Button>
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
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleRemoveRole(role.id)}
                      >
                        Remover
                      </Button>
                    </Box>
                  ))}
              </Box>
            </Box>

            <Box marginTop={4} width="100%">
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                marginTop={2}
              >
                Empresas
              </Typography>
              <Box
                display="flex"
                flexWrap="wrap"
                gap={3}
                borderTop="1px solid #4f4f50"
                paddingTop={1}
              >
                {user.Company &&
                  user.Company.map((company) => (
                    <Box
                      display="flex"
                      alignItems="flex-start"
                      flexDirection="column"
                      gap={1}
                      key={company.id}
                    >
                      <Typography>{company.name}</Typography>
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
