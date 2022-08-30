import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  Link,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import NouBg from '../../../assets/noubg.png';
import { ISignUpCredentials, useAuth } from '../../../hooks/auth';
import { Container, Paper, SignUpButton } from './styles';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Todos os direitos reservados '}
      <Link color="inherit" href="https://www.nou.dev.br/">
        nou®
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignUpUser: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ISignUpCredentials>({
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    showPassword: false,
  } as ISignUpCredentials);

  const { signUp } = useAuth();

  let navigate = useNavigate();

  const handleSubmit = useCallback(
    async (data: ISignUpCredentials) => {
      try {
        setLoading(true);
        const schema = Yup.object().shape({
          name: Yup.string().required('Você deve informar um e-mail'),
          lastname: Yup.string().required('Você deve informar um e-mail'),
          email: Yup.string()
            .required('Você deve informar um e-mail')
            .email('Formato de e-mail inválido'),
          username: Yup.string().required('Você deve informar um e-mail'),
          password: Yup.string().required('Você deve informar uma senha'),

          // passwordConfirmation: ,
        });

        await schema.validate(data);

        const {
          name,
          lastname,
          username,
          email,
          password,
          passwordConfirmation,
          showPassword,
        } = data;
        await signUp({
          name,
          lastname,
          username,
          email,
          password,
          passwordConfirmation,
          showPassword,
        });

        navigate('/');
      } catch (error: any) {
        if (error instanceof Yup.ValidationError) {
          toast.error(error.errors[0]);
        } else {
          toast.error(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [signUp],
  );

  return (
    <Container>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={2}
          md={8}
          sx={{
            backgroundImage: `url(${NouBg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          xs={12}
          sm={10}
          md={4}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Stack
            sx={{
              my: 8,
              mx: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            rowGap={2}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Crie sua conta One
            </Typography>
            <Stack
              rowGap={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <TextField
                id="name"
                label="Nome"
                value={formData.name}
                fullWidth
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <TextField
                id="lastname"
                label="Sobrenome"
                value={formData.lastname}
                fullWidth
                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
              />

              <TextField
                id="email"
                label="E-mail"
                value={formData.email}
                fullWidth
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <TextField
                id="username"
                label="Nome de usuário"
                value={formData.username}
                fullWidth
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />

              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                <OutlinedInput
                  id="password"
                  type={formData.showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            showPassword: !formData.showPassword,
                          });
                        }}
                      >
                        {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Senha"
                />
              </FormControl>

              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirmar Senha
                </InputLabel>
                <OutlinedInput
                  id="password-confirmation"
                  type={formData.showPassword ? 'text' : 'password'}
                  value={formData.passwordConfirmation}
                  onChange={(e) =>
                    setFormData({ ...formData, passwordConfirmation: e.target.value })
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            showPassword: !formData.showPassword,
                          });
                        }}
                      >
                        {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirmar Senha"
                />
              </FormControl>
              {loading ? (
                <LinearProgress
                  sx={{ margin: '18.625px', height: '5px', width: '200px' }}
                />
              ) : (
                <SignUpButton
                  variant="contained"
                  size="large"
                  type="button"
                  onClick={() => handleSubmit(formData)}
                  fullWidth
                >
                  Criar conta
                </SignUpButton>
              )}

              <Grid container>
                <Grid item xs>
                  Já possui uma conta?{' '}
                  <Link href="/" variant="body2">
                    Faça Login
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUpUser;
