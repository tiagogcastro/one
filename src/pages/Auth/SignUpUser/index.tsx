import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Fade, Link, Stack, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Input } from '../../../components/Forms/Input';
import { InputPassword } from '../../../components/Forms/InputPassword';
import { RegisterUserData } from '../../../context';
import { useAuth } from '../../../hooks/useAuth';

const signUpFormSchema = Yup.object().shape({
  email: Yup.string()
    .required('Você deve informar um e-mail')
    .email('Formato de e-mail inválido'),
  password: Yup.string().required('Você deve informar uma senha'),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'As senhas devem ser iguais',
  ),
  name: Yup.string().required('Você deve informar o nome'),
  lastname: Yup.string().required('Você deve informar o último nome'),
  username: Yup.string().required('Você deve informar uma username'),
  company: Yup.object()
    .shape({
      name: Yup.string().required('Você deve informar o nome da sua empresa'),
    })
    .optional(),
});

export function SignUpUserPage() {
  const navigateTo = useNavigate();
  const { register: registerUser } = useAuth();

  const { formState, handleSubmit, register } = useForm<RegisterUserData>({
    resolver: yupResolver(signUpFormSchema),
  });

  const signUpErrors = formState.errors;

  const handleSignIn: SubmitHandler<RegisterUserData> = async (data) => {
    const user = await registerUser(data);

    if (user) {
      navigateTo('/dashboard');
    }
  };

  return (
    <Fade in={true} timeout={1000}>
      <Stack
        sx={{
          mx: 8,
          mt: 4,
          pb: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
        rowGap={2}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Crie uma conta One
        </Typography>

        <Stack
          maxWidth={280}
          rowGap={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" onSubmit={handleSubmit(handleSignIn)}>
            <Input labelText="E-mail" {...register('email')} error={signUpErrors.email} />
            <Input
              labelText="Primeiro nome"
              {...register('name')}
              error={signUpErrors.name}
            />
            <Input
              labelText="Último nome"
              {...register('lastname')}
              error={signUpErrors.lastname}
            />
            <Input
              labelText="Username"
              {...register('username')}
              error={signUpErrors.username}
            />
            <InputPassword
              labelText="Senha"
              {...register('password')}
              error={signUpErrors.password}
            />
            <InputPassword
              labelText="Confirmação de senha"
              {...register('password_confirmation')}
              error={signUpErrors.password_confirmation}
            />

            <Box marginTop={4}>
              <Typography variant="body1" color="text.secondary">
                Empresa
              </Typography>
              <Input
                labelText="Nome da empresa"
                {...register('company.name')}
                error={signUpErrors.company?.name}
              />
            </Box>
            <Button
              variant="contained"
              size="large"
              type="submit"
              fullWidth
              style={{ marginTop: '16px' }}
            >
              Criar conta
            </Button>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Já possui uma conta?
              <Link
                color="#D79600"
                textTransform="uppercase"
                fontSize={12}
                style={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.02857em',
                  lineHeight: 1.75,
                  marginLeft: '4px',
                }}
                href="/login"
              >
                Faça login
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Fade>
  );
}
