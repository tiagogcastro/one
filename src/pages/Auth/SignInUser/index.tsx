import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Fade,
  FormControlLabel,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Input } from '../../../components/Forms/Input';
import { InputPassword } from '../../../components/Forms/InputPassword';
import { SignInData } from '../../../context';
import { useAuth } from '../../../hooks/useAuth';

const signInFormSchema = Yup.object().shape({
  email: Yup.string()
    .required('Você deve informar um e-mail')
    .email('Formato de e-mail inválido'),
  password: Yup.string().required('Você deve informar uma senha'),
});

export function SignInUserPage() {
  const navigateTo = useNavigate();
  const { signIn } = useAuth();

  const { formState, handleSubmit, register } = useForm<SignInData>({
    resolver: yupResolver(signInFormSchema),
  });

  const signInErrors = formState.errors;

  const handleSignIn: SubmitHandler<SignInData> = async (data) => {
    await signIn(data);

    navigateTo('/dashboard');
  };

  return (
    <Fade in={true} timeout={1000}>
      <Stack
        sx={{
          mx: 8,
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
          Login na plataforma One
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
            <Input labelText="E-mail" {...register('email')} error={signInErrors.email} />
            <InputPassword
              labelText="Senha"
              {...register('password')}
              error={signInErrors.password}
            />
            <Button
              variant="contained"
              size="large"
              type="submit"
              fullWidth
              style={{ marginTop: '16px' }}
            >
              Entrar
            </Button>

            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Salvar dados"
            />
          </Box>

          <Grid container>
            <Grid item xs>
              <Link
                color="#D79600"
                textTransform="uppercase"
                fontSize={12}
                style={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.02857em',
                  lineHeight: 1.75,
                }}
                href="/forgot-password"
              >
                Esqueci a senha
              </Link>
            </Grid>
            <Grid item>
              <Link
                color="#D79600"
                textTransform="uppercase"
                fontSize={12}
                style={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.02857em',
                  lineHeight: 1.75,
                }}
                href="/register"
              >
                Criar conta
              </Link>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Fade>
  );
}
